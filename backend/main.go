package main

import (
	"backend/database"
	"backend/routes"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("Start main.go")

	dbpool := database.Connection()
	defer dbpool.Close()

	app := fiber.New()

	routes.SetupApiRoutes(app)

	app.Listen(":4000")
}
