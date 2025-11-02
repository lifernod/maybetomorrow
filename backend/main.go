package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"backend/routes"
)

func main() {
	fmt.Println("Start main.go");

	app := fiber.New();

	routes.SetupApiRoutes(app);

	app.Listen(":4000");
}