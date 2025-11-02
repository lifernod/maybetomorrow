package database

import "github.com/google/uuid"

type DayType string

const (
	DayFree       DayType = "free"
	DayBusy       DayType = "busy"
	DayUndefined  DayType = "undefined"
	DayUneditable DayType = "uneditable"
)

type User struct {
	UserID    uuid.UUID `json:"user_id"`
	Username  string    `json:"username"`
	PasswordT string    `json:"password_t"`
}

type Event struct {
	EventID          int    `json:"event_id"`
	EventName        string `json:"event_name"`
	EventDescription string `json:"event_description"`
}

type Day struct {
	DayID     int     `json:"day_id"`
	DayNumber byte    `json:"day_number"`
	DayType   DayType `json:"day_type"`
}

type Month struct {
	MonthID     int  `json:"month_id"`
	MonthNumber byte `json:"month_number"`
	YearNumber  byte `json:"year_number"`
}
