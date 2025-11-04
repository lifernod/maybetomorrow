package handlers

import "github.com/gofiber/fiber/v2"

func GetUserById(c *fiber.Ctx) error {
	return c.SendString("User get by uuid")
}

func GetMonthsByUserId(c *fiber.Ctx) error {
	return c.SendString("Months get by user uuid")
}

func GetCurrentMonthByUserId(c *fiber.Ctx) error {
	//UserId := c.Params("user_id")
	resp := ResponseMonth{}
	resp.Days = make([][7]ResponseDay, 5);
	return c.JSON(resp)
}