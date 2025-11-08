package handlers

import "github.com/gofiber/fiber/v2"

func GetMonthById(c *fiber.Ctx) error {
	resp := ResponseMonth{}
	resp.Days = make([][7]ResponseDay, 5);
	return c.JSON(resp)
}