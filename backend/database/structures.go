package database

import (
	_ "database/sql"
	_ "github.com/jackc/pgx/v5"
	_ "github.com/jmoiron/sqlx"
)

type Event struct {
	event_id          int
	event_name        string
	event_description string
}

type Day struct {
	day_id     int
	day_number byte
}

type Month struct {
	month_id     byte
	month_number byte
}

type User struct {
	user_id    string
	username   string
	password_t string
}
