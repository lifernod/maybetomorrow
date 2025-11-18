package handlers

import (
	"github.com/gofiber/fiber/v2"
	"backend/database"
	"strconv"
)

func GetDayById(c *fiber.Ctx) error {
	resp := ResponseDay{}
	return c.JSON(resp)
}

func GetEventsByDayId(c *fiber.Ctx) error {
	dayId, err1 := strconv.Atoi(c.Params("id"))

	if err1 != nil { return err1 }
	
	events, err2 := database.GetEventsByDayID(dayId)

	if err2 != nil { return err2 }

	return c.JSON(events)
}

func CreateDay(c *fiber.Ctx) error {
	day := new(ResponseDay)

    if err := c.BodyParser(day); err != nil { return err }

	_, err := database.CreateDay(int16(day.DayNumber), string(day.DayType))
	if err != nil { return err }

	return c.JSON(day)
}

func LinkEventsToDay(c *fiber.Ctx) error {
	eventsToDay := new(ResponseLinkEventsToDay)

    if err := c.BodyParser(eventsToDay); err != nil { return err }
	if err := database.LinkEventsToDay(eventsToDay.DayId, eventsToDay.EventIDs...); err != nil { return err }

	return nil
}