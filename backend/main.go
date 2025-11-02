package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func main() {
	fmt.Println("Start main.go");

	app := fiber.New();

	handlers.SetupApiHandlers(app);

	app.Listen(":4000");
}