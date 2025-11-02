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
	UserID    uuid.UUID `db:"user_id"`
	Username  string    `db:"username"`
	PasswordT string    `db:"password_t"`
}

type Event struct {
	EventID          int    `db:"event_id"`
	EventName        string `db:"event_name"`
	EventDescription string `db:"event_description"`
}

type Day struct {
	DayID     int     `db:"day_id"`
	DayNumber byte    `db:"day_number"`
	DayType   DayType `db:"day_type"`
}

type Month struct {
	MonthID     int  `db:"month_id"`
	MonthNumber byte `db:"month_number"`
	YearNumber  byte `db:"year_number"`
}
