package database

type EventsToDays struct {
	EventID int `json:"event_id" db:"event_id"`
	DayID   int `json:"day_id" db:"day_id"`
}

type DaysToUsers struct {
	Username string `json:"username" db:"username"`
	DayID    int    `json:"day_id" db:"day_id"`
}

type UsersToRooms struct {
	Username string `json:"username" db:"username"`
	RoomID   string `json:"room_id" db:"room_id"`
}
