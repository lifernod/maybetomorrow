package handlers

import "github.com/gofiber/fiber/v2"

func GetDayById(c *fiber.Ctx) error {
	return c.SendString("Day get by id")
}

func GetEventsByDayId(c *fiber.Ctx) error {
	return c.SendString("Events get by day id")
}