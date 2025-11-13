package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"backend/database"
	"strconv"
)

func GetEventById(c *fiber.Ctx) error {
	eventId, err1 := strconv.Atoi(c.Params("id"))

	if err1 != nil {
		return fmt.Errorf("wrong id, cannot convert to int")
	}
	
	event, err2 := database.GetEventByID(eventId)

	if err2 != nil {
		return fmt.Errorf("failed to get event %d: %w", eventId, err2)
	}

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

	id, err := database.CreateEvent(event.EventName, event.EventDescription)
	if err != nil {
		return fmt.Errorf("failed to create event %d: %w", id, err)
	}

	return c.JSON(event)
}