package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupUserRoutes(user fiber.Router) {
	user.Get("/getById", handlers.GetUserById)
	user.Get("/getMonthsById", handlers.GetMonthsByUserId)
	user.Get("/getCurrentMonthById:user_id", handlers.GetCurrentMonthByUserId)
}