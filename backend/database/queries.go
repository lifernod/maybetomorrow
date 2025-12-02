package database

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const timeLayout = "2006-01-02 15:04:05"

func CreateUser(username string, passwordHash string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(passwordHash), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}
	hashedPassword := string(hashedPasswordBytes)
	ctx := context.Background()

	_, err = dbpool.Exec(ctx, `
	INSERT INTO users (username, password_hash) 
	VALUES ($1, $2) 
	ON CONFLICT DO NOTHING;
	`, username, hashedPassword)

	fmt.Printf("User '%s' created successfully.\n", username)
	return err
}

func CreateEvent(events []Event) ([]int, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	if len(events) == 0 {
		return []int{}, nil
	}
	ctx := context.Background()

	var eventNames []string
	var eventDescriptions []string
	var eventStarts []*time.Time
	var eventEnds []*time.Time

	for _, e := range events {
		startTime, err := time.Parse(timeLayout, e.EventStart)
		if err != nil {
			return nil, fmt.Errorf("invalid start time format in event '%s': %w", e.EventName, err)
		}

		var endTime *time.Time
		if e.EventEnd != nil {
			t, err := time.Parse(timeLayout, *e.EventEnd)
			if err != nil {
				return nil, fmt.Errorf("nvalid end time format in event '%s': %w", e.EventName, err)
			}
			endTime = &t
		}
		eventNames = append(eventNames, e.EventName)
		eventDescriptions = append(eventDescriptions, e.EventDescription)
		eventStarts = append(eventStarts, &startTime)
		eventEnds = append(eventEnds, endTime)
	}

	query := `
		INSERT INTO events (event_name, event_description, event_start, event_end)
		SELECT * FROM UNNEST($1::VARCHAR[], $2::VARCHAR[], $3::TIMESTAMP[], $4::TIMESTAMP[])
		RETURNING event_id;
	`

	rows, err := dbpool.Query(ctx, query, eventNames, eventDescriptions, eventStarts, eventEnds)
	if err != nil {
		return nil, fmt.Errorf("failed to create multiple events: %w", err)
	}
	defer rows.Close()

	var eventIDs []int
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err != nil {
			return nil, fmt.Errorf("failed to scan returned event ID: %w", err)
		}
		eventIDs = append(eventIDs, id)
	}
	fmt.Printf("Successfully created %d events. IDs: %v\n", len(eventIDs), eventIDs)

	return eventIDs, nil
}

func CreateDay(number byte, dayType string) (int, error) {
	if dbpool == nil {
		return 0, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var DayID int
	err := dbpool.QueryRow(ctx, `
		INSERT INTO days (day_number, day_type)
		VALUES ($1, $2)
		RETURNING day_id;
		`, number, dayType).Scan(&DayID)
	if err != nil {
		return 0, fmt.Errorf("failed to create day: %w", err)
	}

	fmt.Printf("Day created: id=%d, number=%d, type=%s\n", DayID, number, dayType)
	return DayID, nil
}

func CreateRoom(dayNumber []byte, monthNumber []byte, ownerUsername string, username []string) (string, error) {
	if dbpool == nil {
		return "", fmt.Errorf("database is not initialized")
	}
	if len(username) == 0 {
		return "", fmt.Errorf("room must be at least one user")
	}

	isOwnerInList := false
	for _, user := range username {
		if user == ownerUsername {
			isOwnerInList = true
			break
		}
	}
	if !isOwnerInList {
		username = append(username, ownerUsername)
	}
	ctx := context.Background()

	var roomID string
	err := dbpool.QueryRow(ctx, `
		INSERT INTO rooms (room_id, day_number, month_number, username, owner_username)
		VALUES (gen_random_uuid(), $1, $2, $3, $4)
		RETURNING room_id;
	`, dayNumber, monthNumber, username, ownerUsername).Scan(&roomID)

	if err != nil {
		return "", fmt.Errorf("failed to create room: %w", err)
	}

	fmt.Printf("Room created with ID: %s by owner %s\n", roomID, ownerUsername)
	return roomID, err
}

func AddUserToRoom(roomID string, username string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
	UPDATE rooms
	SET username = array_append(username, $1)
	WHERE room_id = $2 AND NOT ($1 = ANY(username));
	`, username, roomID)

	return err
}

func GetEventByID(eventID int) (*Event, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var e Event
	var startTime time.Time
	var endTime *time.Time

	err := dbpool.QueryRow(ctx, `
		SELECT event_id, event_name, event_description, event_start, event_end
		FROM events WHERE event_id=$1;
		`, eventID).Scan(&e.EventID, &e.EventName, &e.EventDescription, &startTime, &endTime)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get event: %w", err)
	}

	e.EventStart = startTime.Format(timeLayout)
	if endTime != nil {
		str := endTime.Format(timeLayout)
		e.EventEnd = &str
	} else {
		e.EventEnd = nil
	}

	return &e, nil
}

func GetEventsByDayID(dayID int) ([]Event, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	query := `
		SELECT e.event_id, e.event_name, e.event_description, e.event_start, e.event_end
		FROM events e
		JOIN events_to_days ed ON e.event_id = ed.event_id
		WHERE ed.day_id = $1;
	`

	rows, err := dbpool.Query(ctx, query, dayID)
	if err != nil {
		return nil, fmt.Errorf("failed to get events for day %d: %w", dayID, err)
	}
	defer rows.Close()

	var events []Event
	for rows.Next() {
		var e Event
		var startTime time.Time
		var endTime *time.Time
		err := rows.Scan(&e.EventID, &e.EventName, &e.EventDescription, &startTime, &endTime)
		if err != nil {
			return nil, fmt.Errorf("failed to scan event: %w", err)
		}

		e.EventStart = startTime.Format(timeLayout)
		if endTime != nil {
			str := endTime.Format(timeLayout)
			e.EventEnd = &str
		} else {
			e.EventEnd = nil
		}

		events = append(events, e)
		fmt.Printf("Event found for day %d: id=%d, name=%s\n", dayID, e.EventID, e.EventName)
	}

	return events, nil
}

func GetUserDaysByMonth(username string, month byte) ([]Day, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	query := `
		SELECT d.day_id, d.day_number, d.month_number, d.day_type
		FROM days d
		JOIN days_to_users du ON d.day_id = du.day_id
		WHERE du.username = $1 AND d.month_number = $2;
	`

	rows, err := dbpool.Query(ctx, query, username, month)
	if err != nil {
		return nil, fmt.Errorf("failed to get days: %w", err)
	}
	defer rows.Close()

	var result []Day
	for rows.Next() {
		var day Day
		if err := rows.Scan(&day.DayID, &day.DayNumber, &day.MonthNumber, &day.DayType); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}
		result = append(result, day)
	}

	return result, nil
}

func GetRoomByRoomID(roomID string) (*Room, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var r Room

	err := dbpool.QueryRow(ctx, `
		SELECT room_id, day_number, month_number, owner_username, username
		FROM rooms WHERE room_id = $1;
	`, roomID).Scan(&r.RoomID, &r.DayNumber, &r.MonthNumber, &r.OwnerUsername, &r.Username)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get room by RoomID: %w", err)
	}

	return &r, nil
}

func GetRoomsByOwnerUsername(ownerUsername string) ([]Room, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	rows, err := dbpool.Query(ctx, `
		SELECT room_id, day_number, month_number, owner_username, username
		FROM rooms WHERE owner_username = $1;
	`, ownerUsername)

	if err != nil {
		return nil, fmt.Errorf("failed to get rooms by OwnerUsername: %w", err)
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var r Room

		err := rows.Scan(&r.RoomID, &r.DayNumber, &r.MonthNumber, &r.OwnerUsername, &r.Username)
		if err != nil {
			return nil, fmt.Errorf("failed to scan room row: %w", err)
		}

		rooms = append(rooms, r)
	}

	return rooms, nil
}

func ValidateUser(username string, passwordHash string) (bool, error) {
	if dbpool == nil {
		return false, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var storedHash string
	err := dbpool.QueryRow(ctx, `
		SELECT password_hash
		FROM users
		WHERE username = $1;
		`, username).Scan(&storedHash)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return false, nil
		}
		return false, fmt.Errorf("database query failed for user verification: %w", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(passwordHash))
	if err == nil {
		fmt.Printf("User '%s' verified successfully.\n", username)
		return true, nil
	} else if err == bcrypt.ErrMismatchedHashAndPassword {
		fmt.Printf("Verification failed for user '%s': incorrect password.\n", username)
		return false, nil
	}

	return false, fmt.Errorf("bcrypt comparison failed: %w", err)
}

func LinkEventsToDay(dayID int, eventIDs ...int) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	if len(eventIDs) == 0 {
		return fmt.Errorf("no events to link")
	}
	ctx := context.Background()

	var dayIDs []int
	for range eventIDs {
		dayIDs = append(dayIDs, dayID)
	}

	_, err := dbpool.Exec(ctx, `
		INSERT INTO events_to_days (event_id, day_id)
		SELECT * FROM UNNEST($1::INT[], $2::INT[])
		ON CONFLICT DO NOTHING;
	`, eventIDs, dayIDs)

	if err != nil {
		return fmt.Errorf("failed to link events to day %d: %w", dayID, err)
	}

	fmt.Printf("Successfully linked %d events to day %d\n", len(eventIDs), dayID)

	return nil
}

func UpdateEvent(eventID int, name string, description string, start string, end *string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	startTime, err := time.Parse(timeLayout, start)
	if err != nil {
		return fmt.Errorf("invalid start time format: %w", err)
	}

	var endTime *time.Time
	if end != nil {
		t, err := time.Parse(timeLayout, *end)
		if err != nil {
			return fmt.Errorf("invalid end time format: %w", err)
		}
		endTime = &t
	}

	_, err = dbpool.Exec(ctx, `
		UPDATE events
		SET event_name = $1, 
		    event_description = $2,
		    event_start = $3,
		    event_end = $4
		WHERE event_id = $5;
	`, name, description, startTime, endTime, eventID)

	if err != nil {
		return fmt.Errorf("failed to update event: %w", err)
	}

	fmt.Printf("Event updated: id=%d, name=%s\n", eventID, name)
	return nil
}

func RemoveUserFromRoom(roomID string, username string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
	UPDATE rooms
	SET username = array_remove(username, $1)
	WHERE room_id = $2 AND owner_username <> $1;
	`, username, roomID)

	return err
}
