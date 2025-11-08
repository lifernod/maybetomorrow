package handlers

import "github.com/gofiber/fiber/v2"

func GetDayById(c *fiber.Ctx) error {
	resp := ResponseDay{}
	return c.JSON(resp)
}

func GetEventsByDayId(c *fiber.Ctx) error {
	resp := [3]ResponseEvent{}
	return c.JSON(resp)
}