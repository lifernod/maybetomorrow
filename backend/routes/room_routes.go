package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/handlers"
)

func SetupRoomRoutes(room fiber.Router) {
	room.Post("/create", handlers.CreateRoom)
	room.Post("/addUser", handlers.AddUserToRoom)
	room.Post("/removeUser", handlers.RemoveUserFromRoom)
	room.Get("/GetRoomByRoomID/:id", handlers.GetRoomByRoomID)
}