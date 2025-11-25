package handlers

import (
	"github.com/google/uuid"
	"backend/database"
)

type ResponseEvent struct {
	EventID          int       `json:"event_id"`
	EventName        string    `json:"event_name"`
	EventDescription string    `json:"event_description"`
	StartTime        string    `json:"start_time"`
	EndTime          *string   `json:"end_time"`
}

type ResponseDay struct {
	DayID       int             `json:"day_id"`
	DayNumber   byte             `json:"day_number"`
	MonthNumber byte             `json:"month_number"`
	DayType     database.DayType `json:"day_type"`
	Events      []int            `json:"events"` //EventID
}

type ResponseMonth struct {
	Days        [][7]ResponseDay `json:"days"`
	MonthNumber byte             `json:"month_number"`
}

type ResponseUser struct {
	UserID    uuid.UUID `json:"user_id"`
	Username  string    `json:"username"`
	PasswordT string    `json:"password_t"`
}

type ResponseLinkEventsToDay struct {
	DayId     int     `json:"day_id"`
	EventIDs  []int   `json:"event_ids"`
}