package database

type DayType string

const (
	DayUndefined  DayType = "undefined"
	DayFree       DayType = "free"
	DayBusy       DayType = "busy"
	DayUneditable DayType = "uneditable"
)

type User struct {
	Username     string `json:"username" db:"username"`
	PasswordHash string `json:"password_hash" db:"password_hash"`
}

type Event struct {
	EventID          int    `json:"event_id" db:"event_id"`
	EventName        string `json:"event_name" db:"event_name"`
	EventDescription string `json:"event_description" db:"event_description"`

	EventStart string  `json:"event_start" db:"event_start"`
	EventEnd   *string `json:"event_end" db:"event_end"`
}

type Day struct {
	DayID       int     `json:"day_id" db:"day_id"`
	DayNumber   byte    `json:"day_number" db:"day_number"`
	MonthNumber byte    `json:"month_number" db:"month_number"`
	DayType     DayType `json:"day_type" db:"day_type"`
}

type Room struct {
	RoomID      string `json:"room_id" db:"room_id"`
	DayNumber   []byte `json:"day_number" db:"day_number"`
	MonthNumber []byte `json:"month_number" db:"month_number"`
	Username    string `json:"username" db:"username"`
}
