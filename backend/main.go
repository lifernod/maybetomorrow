package main

import (
	"backend/database"
	"backend/routes"
	"fmt"
	"backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("Start main.go")

	database.Connection()
	defer database.GetPool().Close()

	app := fiber.New()

	app.Use(func(c *fiber.Ctx) error {
		if c.Path() == "/api/user/create" && c.Method() == "POST" { return c.Next() }

		user := new(handlers.ResponseUser)
		if err := c.CookieParser(user); err != nil { return err }

		isRight, err := database.ValidateUser(user.Username, user.PasswordHash)
		if err != nil { return err }
		
		if isRight { return c.Next() }
		return fmt.Errorf("user %s is not validated", user.Username)
	})

	routes.SetupApiRoutes(app)

	app.Listen(":4000")
}
