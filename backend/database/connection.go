package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var dbpool *pgxpool.Pool

func Connection() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbpool, err = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}

	if err := CreateSchema(dbpool); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database connected successfully")
}

// GetPool Если нужно получить доступ к пулу напрямую (тесты, отладки)
func GetPool() *pgxpool.Pool {
	return dbpool
}
