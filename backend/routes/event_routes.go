package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupEventRoutes(event fiber.Router) {
	event.Get("/getById:id", handlers.GetEventById)
	event.Get("/getDaysById", handlers.GetDaysByEventId)
	event.Post("/create", handlers.CreateEvent)
	event.Put("/update", handlers.UpdateEvent)
}