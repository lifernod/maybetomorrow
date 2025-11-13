package handlers

import (
	"github.com/gofiber/fiber/v2"
	"backend/database"
	"fmt"
	"strconv"
)

func GetDayById(c *fiber.Ctx) error {
	resp := ResponseDay{}
	return c.JSON(resp)
}

func GetEventsByDayId(c *fiber.Ctx) error {
	dayId, err1 := strconv.Atoi(c.Params("id"))

	if err1 != nil {
		return fmt.Errorf("wrong id, cannot convert to int")
	}
	
	events, err2 := database.GetEventsByDayID(dayId)

	if err2 != nil {
		return fmt.Errorf("failed to get events by day id %d: %w", dayId, err2)
	}

	return c.JSON(events)
}

func CreateDay(c *fiber.Ctx) error {
	day := new(ResponseDay)

    if err := c.BodyParser(day); err != nil {
        return err
    }

	id, err := database.CreateDay(int16(day.DayNumber), string(day.DayType))
	if err != nil {
		return fmt.Errorf("failed to create day %d: %w", id, err)
	}

	return c.JSON(day)
}