package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupMonthRoutes(month fiber.Router) {
	month.Get("/getById", handlers.GetMonthById)
	month.Get("/getDaysById", handlers.GetDaysByMonthId)
}