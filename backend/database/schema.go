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

	_, err := dbpool.Exec(ctx, `create extension if not exists "pgcrypto";`)
	if err != nil {
		return fmt.Errorf("failed to create extension: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	create table if not exists users (
		user_id uuid primary key default gen_random_uuid(),
		username varchar(255) unique not null,
		user_password varchar(32) not null
	);`)
	if err != nil {
		return fmt.Errorf("failed to create users table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	create table if not exists events (
		event_id serial primary key,
		event_name varchar(125) not null,
		event_description varchar(1024)
	);`)
	if err != nil {
		return fmt.Errorf("failed to create events table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	create type e_day_type as enum ('undefined', 'free', 'busy', 'uneditable');
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
	create table if not exists days (
		day_id serial primary key,
		day_number smallint not null default 1,
		day_type e_day_type default 'undefined'
	);`)
	if err != nil {
		return fmt.Errorf("failed to create days table: %w", err)
	}

	_, err = dbpool.Exec(ctx, `
	create table if not exists events_to_days (
		event_id int,
		day_id int,
		primary key (event_id, day_id),
		constraint fk_event foreign key (event_id) references events(event_id),
		constraint fk_day foreign key (day_id) references days(day_id)
	);`)
	if err != nil {
		return fmt.Errorf("failed to create events_to_days table: %w", err)
	}

	return nil
}
