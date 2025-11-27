package handlers

import (
	"github.com/gofiber/fiber/v2"
	"backend/database"
)

func CreateRoom(c *fiber.Ctx) error {
	roomData := new(struct{
		dayNumbers     []int     `json:"day_numbers"`
		monthNumbers   []int     `json:"month_numbers"`
		usernames      []string  `json:"usernames"`
	})

	if err := c.BodyParser(roomData); err != nil { return err }

	if err := database.CreateRoom("", roomData.dayNumbers, roomData.monthNumbers, roomData.usernames); err != nil { return err } //Fix "" to nothing after db func fix

	return nil  //Fix to sending roomID
}

func AddUserToRoom(c *fiber.Ctx) error {
	data := new(struct{
		roomID     string    `json:"room_id"`
		username   string    `json:"username"`
	})

	if err := c.BodyParser(data); err != nil { return err }

	if err := database.AddUserToRoom(data.roomID, data.username); err != nil { return err }

	return nil
}