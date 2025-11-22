package database

type EventsToDays struct {
	EventID int `json:"event_id" db:"event_id"`
	DayID   int `json:"day_id" db:"day_id"`
}

type DaysToUsers struct {
	Username string `json:"username" db:"username"`
	DayID    int    `json:"day_id" db:"day_id"`
}
