package handlers

import "github.com/gofiber/fiber/v2"

func GetEventById(c *fiber.Ctx) error {
	return c.SendString("Event get by id")
}

func GetDaysByEventId(c *fiber.Ctx) error {
	return c.SendString("Days get by event id")
}