package handlers

import "github.com/gofiber/fiber/v2"

func GetDayById(c *fiber.Ctx) error {
	resp := ResponseDay{}
	return c.JSON(resp)
}

func GetEventsByDayId(c *fiber.Ctx) error {
	events := [3]ResponseEvent{}
	//dayId := c.Params("id")
	//events, err := database.GetEventsByDayID(dayId)

	//if err != nil {
	//	return fmt.Errorf("Failed to get events by day id %d: %w", dayId, err)
	//}

	return c.JSON(events)
}

func CreateDay(c *fiber.Ctx) error {
	day := new(ResponseDay)

    if err := c.BodyParser(day); err != nil {
        return err
    }

	//id, err := database.CreateDay(day.DayNumber, day.DayType)
	//if err != nil {
	//	return fmt.Errorf("Failed to create day %d: %w", id, err)
	//}

	return c.JSON(day)
}