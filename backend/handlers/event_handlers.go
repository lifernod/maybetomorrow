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

func CreateEvent(c *fiber.Ctx) error {
	var events []database.Event

    if err := c.BodyParser(events); err != nil { return err }

	ids, err := database.CreateEvent(events)
	if err != nil { return err }
	
	for i:=0 ; i < len(events)-1 ; i++ {
		events[i].EventID = ids[i]
	}
	
	return c.JSON(events)
}

func UpdateEvent(c *fiber.Ctx) error {
	event := new(ResponseEvent)

    if err := c.BodyParser(event); err != nil { return err }
	if err := database.UpdateEvent(event.EventID, event.EventName, event.EventDescription, event.StartTime, event.EndTime); err != nil { return err }

	return nil
}