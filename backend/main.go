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
	handlers.SetupSiteHandlers(app);

	app.Listen(":3000");
}