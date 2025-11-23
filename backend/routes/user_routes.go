package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupUserRoutes(user fiber.Router) {
	user.Get("/getById", handlers.GetUserById)
	user.Post("/getCurrentMonthById", handlers.GetCurrentMonthByUserId)
	user.Post("/create", handlers.CreateUser)
}