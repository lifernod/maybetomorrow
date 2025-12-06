package main

import (
	"backend/database"
	"backend/routes"
	"fmt"
	"backend/handlers"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
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

		hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(user.PasswordHash), bcrypt.DefaultCost)
		if err != nil { return err }
		hashedPassword := string(hashedPasswordBytes)

		isRight, err := database.ValidateUser(user.Username, hashedPassword)
		if err != nil { return err }
		
		if isRight { return c.Next() }
		return fmt.Errorf("user %s is not validated", user.Username)
	})

	routes.SetupApiRoutes(app)

	app.Listen(":4000")
}
