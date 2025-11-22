package handlers

import (
	"github.com/gofiber/fiber/v2"
	"backend/database"
	"strconv"
)

func GetEventById(c *fiber.Ctx) error {
	eventId, err := strconv.Atoi(c.Params("id"))
	if err != nil { return err }
	
	event, err := database.GetEventByID(eventId)
	if err != nil { return err }

	return c.JSON(event)
}

func GetDaysByEventId(c *fiber.Ctx) error {
	resp := [3]ResponseDay{}
	return c.JSON(resp)
}

func CreateEvent(c *fiber.Ctx) error {
	event := new(ResponseEvent)

    if err := c.BodyParser(event); err != nil { return err }

	id, err := database.CreateEvent(event.EventName, event.EventDescription)
	if err != nil { return err }
	event.EventID = id
	
	return c.JSON(event)
}

func UpdateEvent(c *fiber.Ctx) error {
	event := new(ResponseEvent)

    if err := c.BodyParser(event); err != nil { return err }
	if err := database.UpdateEvent(event.EventID, event.EventName, event.EventDescription); err != nil { return err }

	return nil
}