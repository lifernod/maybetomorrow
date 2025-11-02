package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupDayRoutes(day fiber.Router) {
	day.Get("/getById", handlers.GetDayById)
	day.Get("/getEventsById", handlers.GetEventsByDayId)
}