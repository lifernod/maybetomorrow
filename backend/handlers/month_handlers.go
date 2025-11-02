package handlers

import "github.com/gofiber/fiber/v2"

func GetMonthById(c *fiber.Ctx) error {
	return c.SendString("Month get by id")
}

func GetDaysByMonthId(c *fiber.Ctx) error {
	return c.SendString("Days get by month id")
}