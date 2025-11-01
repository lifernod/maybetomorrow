package handlers

import "github.com/gofiber/fiber/v2"

func SetupSiteHandlers(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Standart site page")
	})	
}