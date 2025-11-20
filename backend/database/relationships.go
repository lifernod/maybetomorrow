package database

import "github.com/google/uuid"

type EventsToDay struct {
	EventID int `json:"event_id" db:"event_id"`
	DayID   int `json:"day_id" db:"day_id"`
}

type UsersToMonths struct {
	UserID  uuid.UUID `json:"user_id" db:"user_id"`
	MonthID int       `json:"month_id" db:"month_id"`
}
