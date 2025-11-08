package handlers

import "github.com/gofiber/fiber/v2"

func GetUserById(c *fiber.Ctx) error {
	resp := ResponseUser{}
	return c.JSON(resp)
}

func GetCurrentMonthByUserId(c *fiber.Ctx) error {
	//UserId := c.Params("user_id")
	resp := ResponseMonth{}
	resp.Days = make([][7]ResponseDay, 5);
	return c.JSON(resp)
}