package database

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

func CreateSchema(dbpool *pgxpool.Pool) error {
	ctx := context.Background()

	_, err := dbpool.Exec(ctx, `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`)
	if err != nil {
		return fmt.Errorf("failed to create extension: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TYPE e_day_type AS ENUM ('undefined', 'free', 'busy', 'uneditable');
	`)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			if pgErr.Code != "42710" { // 42710 = duplicate_object
				return fmt.Errorf("failed to create enum type: %w", err)
			}
		} else {
			return fmt.Errorf("failed to create enum type, dupe: %w", err)
		}
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS users (
		username VARCHAR(125) PRIMARY KEY UNIQUE NOT NULL,
		password_hash VARCHAR(32) NOT NULL
	);`)
	if err != nil {
		return fmt.Errorf("failed to create users table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS events (
		event_id SERIAL PRIMARY KEY,
		event_name VARCHAR(125) NOT NULL,
		event_description VARCHAR(1024),
		event_start TIMESTAMP NOT NULL,
		event_end TIMESTAMP
	                                  
	    CONSTRAINT check_event_time CHECK (event_end IS NULL OR event_end >= event_start)
	);`)
	if err != nil {
		return fmt.Errorf("failed to create events table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS days (
		day_id SERIAL PRIMARY KEY,
		day_number SMALLINT NOT NULL DEFAULT 1,
		month_number SMALLINT NOT NULL DEFAULT 1,
		day_type e_day_type DEFAULT 'undefined'
	);`)
	if err != nil {
		return fmt.Errorf("failed to create days table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS events_to_days (
		event_id INT NOT NULL,
		day_id INT NOT NULL,
		PRIMARY KEY (event_id, day_id),
		CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id),
		CONSTRAINT fk_day FOREIGN KEY (day_id) REFERENCES days(day_id)
	);`)
	if err != nil {
		return fmt.Errorf("failed to create events_to_days table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS days_to_users (
	    username VARCHAR(125) NOT NULL,
	    day_id INT NOT NULL,
	    PRIMARY KEY (username, day_id),
	    CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users(username),
	    CONSTRAINT fk_day FOREIGN KEY (day_id) REFERENCES days(day_id)
	);`)
	if err != nil {
		return fmt.Errorf("failed to create events_to_users table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	CREATE TABLE IF NOT EXISTS rooms(
	    room_id TEXT PRIMARY KEY UNIQUE NOT NULL,
	    day_number SMALLINT[] NOT NULL,
	    month_number SMALLINT[] NOT NULL,
	    username VARCHAR(155)[] NOT NULL
	);`)
	if err != nil {
		return fmt.Errorf("failed to create rooms table: %w", err)

	}

	return nil
}
