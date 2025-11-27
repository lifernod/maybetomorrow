package database

import (
	"context"
	"fmt"
	"time"
)

const timeLayout = "2006-01-02 15:04:05"

func CreateUser(username string, passwordHash string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}

	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
	INSERT INTO users (username, password_hash) 
	VALUES ($1, $2) 
	ON CONFLICT DO NOTHING;
	`, username, passwordHash)

	return err
}

func CreateEvent(name string, description string, start string, end *string) (int, error) {
	if dbpool == nil {
		return 0, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	startTime, err := time.Parse(timeLayout, start)
	if err != nil {
		return 0, fmt.Errorf("invalid start time format: %w", err)
	}

	var endTime *time.Time
	if end != nil {
		t, err := time.Parse(timeLayout, *end)
		if err != nil {
			return 0, fmt.Errorf("invalid end time format: %w", err)
		}
		endTime = &t
	}

	var eventID int
	err = dbpool.QueryRow(ctx, `
		INSERT INTO events (event_name, event_description, event_start, event_end)
		VALUES ($1, $2, $3, $4)
		RETURNING event_id;
		`, name, description, startTime, endTime).Scan(&eventID)
	if err != nil {
		return 0, fmt.Errorf("failed to create event: %w", err)
	}

	fmt.Printf("Event created: id=%d, name=%s\n:", eventID, name)
	return eventID, nil
}

func CreateDay(number int16, dayType string) (int, error) {
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

func CreateRoom(roomID string, dayNumber []int, monthNumber []int, username []string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	if len(username) == 0 {
		return fmt.Errorf("room must be at least one user")
	}
	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
	INSERT INTO rooms (room_id, day_number, month_number, username)
	VALUES ($1, $2, $3, $4)
	ON CONFLICT DO NOTHING;
	`, roomID, dayNumber, monthNumber, username)

	return err
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

func GetUserDaysByMonth(username string, month int) ([]Day, error) {
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

func LinkEventsToDay(dayID int, eventIDs ...int) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	if len(eventIDs) == 0 {
		return fmt.Errorf("no events to link")
	}
	ctx := context.Background()

	for _, eventID := range eventIDs {
		_, err := dbpool.Exec(ctx, `
			INSERT INTO events_to_days (event_id, day_id)
			VALUES ($1, $2)
			ON CONFLICT DO NOTHING;
		`, eventID, dayID)

		if err != nil {
			return fmt.Errorf("failed to link event %d to day %d: %w", eventID, dayID, err)
		}

		fmt.Printf("Linked event %d to day %d\n", eventID, dayID)
	}

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
	WHERE room_id = $2;
	`, username, roomID)

	return err
}
