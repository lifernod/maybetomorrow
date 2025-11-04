package handlers

import (
	"github.com/google/uuid"
	"backend/database"
)

type ResponseEvent struct {
	EventID          int    `json:"event_id"`
	EventName        string `json:"event_name"`
	EventDescription string `json:"event_description"`
}

type ResponseDay struct {
	DayID     int     `json:"day_id"`
	DayNumber byte    `json:"day_number"`
	DayType   database.DayType `json:"day_type"`
	Events    []int `json:"events"` //EventID
}

type ResponseMonth struct {
	MonthID     int  `json:"month_id"`
	MonthNumber byte `json:"month_number"`
	YearNumber  byte `json:"year_number"`
	Days        [][7]ResponseDay `json:"days"`
}

type ResponseUser struct {
	UserID    uuid.UUID `json:"user_id"`
	Username  string    `json:"username"`
	PasswordT string    `json:"password_t"`
	Months    []ResponseMonth `json:"months"`
}