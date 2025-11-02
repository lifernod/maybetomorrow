package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupEventRoutes(event fiber.Router) {
	event.Get("/getById", handlers.GetEventById)
	event.Get("/getDaysById", handlers.GetDaysByEventId)
}