package database

import (
	"context"
	"fmt"
)

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

func CreateEvent(name string, description string) (int, error) {
	if dbpool == nil {
		return 0, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var Username int
	err := dbpool.QueryRow(ctx, `
		INSERT INTO events (event_name, event_description)
		VALUES ($1, $2)
		RETURNING event_id;
		`, name, description).Scan(&Username)
	if err != nil {
		return 0, fmt.Errorf("failed to create event: %w", err)
	}
	fmt.Printf("Event created: id=%d, name=%s\n:", Username, name)

	return Username, nil
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

func CreateRoom(roomID string, dayNumber []int, monthNumber []int) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}

	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
	INSERT INTO rooms (roomID, day_number, month_number)
	VALUES ($1, $2, $3)
	ON CONFLICT DO NOTHING;
	`, roomID, dayNumber, monthNumber)

	return err
}

func UpdateEvent(eventID int, name string, description string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}

	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
		UPDATE events
		SET event_name = $1, 
		    event_description = $2
		WHERE event_id = $3;
	`, name, description, eventID)

	if err != nil {
		return fmt.Errorf("failed to update event: %w", err)
	}

	fmt.Printf("Event updated: id=%d, name=%s\n", eventID, name)

	return nil
}

func GetEventByID(eventID int) (*Event, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	var e Event
	err := dbpool.QueryRow(ctx, `
		SELECT event_id, event_name, event_description
		FROM events WHERE event_id=$1;
		`, eventID).Scan(&e.EventID, &e.EventName, &e.EventDescription)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get event: %w", err)
	}

	return &e, nil
}

func GetEventsByDayID(dayID int) ([]Event, error) {
	if dbpool == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	query := `
		SELECT e.event_id, e.event_name, e.event_description
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
		err := rows.Scan(&e.EventID, &e.EventName, &e.EventDescription)
		if err != nil {
			return nil, fmt.Errorf("failed to scan event: %w", err)
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

func LinkUserToRoom(username string, roomID string) error {
	if dbpool == nil {
		return fmt.Errorf("database is not initialized")
	}
	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `
		INSERT INTO users_to_rooms (username, roomID)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING;
	`, username, roomID)

	if err != nil {
		return fmt.Errorf("failed to add user to room: %w", err)
	}

	fmt.Printf("User %s added to room %s\n", username, roomID)
	return nil
}
"backend. Feat: добавлены функции "получение всех дней для заданного пользователя за заданный месяц и линковка пользователя к комнате
