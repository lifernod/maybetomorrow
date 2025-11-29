package handlers

import (
	"github.com/gofiber/fiber/v2"
	"backend/database"
)

func CreateRoom(c *fiber.Ctx) error {
	roomData := new(struct{
		DayNumbers     []byte    `json:"day_numbers"`
		MonthNumbers   []byte    `json:"month_numbers"`
		OwnerUsername  string    `json:"owner_username"`
		Usernames      []string  `json:"usernames"`
	})

	if err := c.BodyParser(roomData); err != nil { return err }

	roomId, err := database.CreateRoom(roomData.DayNumbers, roomData.MonthNumbers, roomData.OwnerUsername, roomData.Usernames); 
	if err != nil { return err }

	return c.SendString(roomId)
}

func AddUserToRoom(c *fiber.Ctx) error {
	data := new(struct{
		RoomID     string    `json:"room_id"`
		Username   string    `json:"username"`
	})

	if err := c.BodyParser(data); err != nil { return err }

	if err := database.AddUserToRoom(data.RoomID, data.Username); err != nil { return err }

	return nil
}

func RemoveUserFromRoom(c *fiber.Ctx) error {
	data := new(struct{
		RoomID     string    `json:"room_id"`
		Username   string    `json:"username"`
	})

	if err := c.BodyParser(data); err != nil { return err }

	if err := database.RemoveUserFromRoom(data.RoomID, data.Username); err != nil { return err }

	return nil
}

func GetRoomByRoomID(c *fiber.Ctx) error {
	roomId := c.Params("id")
	
	room, err := database.GetRoomByRoomID(roomId)
	if err != nil { return err }

	return c.JSON(room)
}