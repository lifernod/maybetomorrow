package handlers

import "github.com/gofiber/fiber/v2"

func GetUserById(c *fiber.Ctx) error {
	return c.SendString("User get by uuid")
}

func GetMonthsByUserId(c *fiber.Ctx) error {
	return c.SendString("Months get by user uuid")
}