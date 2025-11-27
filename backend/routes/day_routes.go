package routes

import (
	"backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupDayRoutes(day fiber.Router) {
	day.Get("/getEventsById/:id", handlers.GetEventsByDayId)
	day.Post("/create", handlers.CreateDay)
	day.Post("/linkEventsToDay", handlers.LinkEventsToDay)
}