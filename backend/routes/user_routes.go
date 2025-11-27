package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupUserRoutes(user fiber.Router) {
	user.Post("/getCurrentMonth", handlers.GetCurrentMonth)
	user.Post("/create", handlers.CreateUser)
}