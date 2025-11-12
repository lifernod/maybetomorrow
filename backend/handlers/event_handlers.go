package handlers

import (
	//"fmt"
	"github.com/gofiber/fiber/v2"
	//"backend/database"
)

func GetEventById(c *fiber.Ctx) error {
	event := new(ResponseEvent)
	//eventId := c.Params("id")
	//event, err := database.GetEventByID(eventId)

	//if err != nil {
	//	return fmt.Errorf("Failed to get event %d: %w", eventId, err)
	//}

	return c.JSON(event)
}

func GetDaysByEventId(c *fiber.Ctx) error {
	resp := [3]ResponseDay{}
	return c.JSON(resp)
}

func CreateEvent(c *fiber.Ctx) error {
	event := new(ResponseEvent)

    if err := c.BodyParser(event); err != nil {
        return err
    }

	//id, err := database.CreateEvent(event.EventName, event.EventDescription)
	//if err != nil {
	//	return fmt.Errorf("Failed to create event %d: %w", id, err)
	//}

	return c.JSON(event)
}