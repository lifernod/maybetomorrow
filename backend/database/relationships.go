package database

import "github.com/google/uuid"

type EventsToDay struct {
	EventID int `json:"event_id"`
	DayID   int `json:"day_id"`
}

type DaysToMonths struct {
	DayID   int `json:"day_id"`
	MonthID int `json:"month"`
}

type UsersToMonths struct {
	UserID  uuid.UUID `json:"user_id"`
	MonthID int       `json:"months"`
}
