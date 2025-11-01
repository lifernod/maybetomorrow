package handlers

import "github.com/gofiber/fiber/v2"

func SetupApiHandlers(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/event/getByID", func(c *fiber.Ctx) error {
		return c.SendString("Event get by id")
	})

	api.Get("/event/getDaysByID", func(c *fiber.Ctx) error {
		return c.SendString("Days get by event id")
	})

	api.Get("/day/getByID", func(c *fiber.Ctx) error {
		return c.SendString("Day get by id")
	})

	api.Get("/day/getEventsByID", func(c *fiber.Ctx) error {
		return c.SendString("Events get by day id")
	})

	api.Get("/month/getByID", func(c *fiber.Ctx) error {
		return c.SendString("Manth get by id")
	})

	api.Get("/month/getDaysByID", func(c *fiber.Ctx) error {
		return c.SendString("Days get by month id")
	})

	api.Get("/user/getByUUID", func(c *fiber.Ctx) error {
		return c.SendString("User get by uuid")
	})

	api.Get("/user/getMonthsByUUID", func(c *fiber.Ctx) error {
		return c.SendString("Months get by user uuid")
	})
}
