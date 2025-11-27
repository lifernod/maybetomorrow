package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupRoomRoutes(room fiber.Router) {
	room.Post("/create", handlers.CreateRoom)
}