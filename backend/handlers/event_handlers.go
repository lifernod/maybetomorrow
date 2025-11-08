package handlers

import "github.com/gofiber/fiber/v2"

func GetEventById(c *fiber.Ctx) error {
	resp := ResponseEvent{}
	return c.JSON(resp)
}

func GetDaysByEventId(c *fiber.Ctx) error {
	resp := [3]ResponseDay{}
	return c.JSON(resp)
}