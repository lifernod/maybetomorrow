package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func CreateEvent(dbpool *pgxpool.Pool, name string, description string) (int, error) {
	ctx := context.Background()

	var EventID int
	err := dbpool.QueryRow(ctx, `
		insert into events (event_name, event_description)
		values ($1, $2)
		returning event_id;
		`, name, description).Scan(&EventID)
	if err != nil {
		return 0, fmt.Errorf("failed to create event: %w", err)
	}
	fmt.Printf("Event created: id=%d, name=%s\n:", EventID, name)
	return EventID, nil
}

func CreateDay(dbpool *pgxpool.Pool, number int16, dayType string) (int, error) {
	ctx := context.Background()

	var DayID int
	err := dbpool.QueryRow(ctx, `
		insert into days (day_number, day_type)
		values ($1, $2)
		returning day_id;
		`, number, dayType).Scan(&DayID)
	if err != nil {
		return 0, fmt.Errorf("failed to create day: %w", err)
	}

	fmt.Printf("Day created: id=%d, number=%d, type=%s\n", DayID, number, dayType)
	return DayID, nil
}

func GetEventByID(dbpool *pgxpool.Pool, eventID int) (*Event, error) {
	ctx := context.Background()

	var e Event

	err := dbpool.QueryRow(ctx, `
		select event_id, event_name, event_description
		from events where event_id=$1;
		`, eventID).Scan(&e.EventID, &e.EventName, &e.EventDescription)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get event: %w", err)
	}

	return &e, nil
}

func GetEventsByDayID(dbpool *pgxpool.Pool, dayID int) ([]Event, error) {
	ctx := context.Background()

	query := `
		SELECT e.event_id, e.event_name, e.event_description
		FROM events e
		JOIN events_to_days ed ON e.event_id = ed.event_id
		WHERE ed.day_id = $1;`

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
