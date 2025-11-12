package database

import (
	"time"

	"github.com/google/uuid"
)

type DayType string

const (
	DayUndefined  DayType = "undefined"
	DayFree       DayType = "free"
	DayBusy       DayType = "busy"
	DayUneditable DayType = "uneditable"
)

type User struct {
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	Username  string    `json:"username" db:"username"`
	PasswordT string    `json:"password_t" db:"password_t"`
}

type Event struct {
	EventID          int       `json:"event_id" db:"event_id"`
	EventName        string    `json:"event_name" db:"event_name"`
	EventDescription string    `json:"event_description" db:"event_description"`
	EventStart       time.Time `json:"event_start" db:"event_start"`
	EventEnd         time.Time `json:"event_end" db:"event_end"`
}

type Day struct {
	DayID       int     `json:"day_id" db:"day_id"`
	DayNumber   byte    `json:"day_number" db:"day_number"`
	MonthNumber byte    `json:"month_number" db:"month_number"`
	DayType     DayType `json:"day_type" db:"day_type"`
}
