package routes

import "github.com/gofiber/fiber/v2"

func SetupApiRoutes(app *fiber.App) {
	api := app.Group("/api")

	SetupEventRoutes(api.Group("/event"))
	SetupDayRoutes(api.Group("/day"))
	SetupMonthRoutes(api.Group("/month"))
	SetupUserRoutes(api.Group("/user"))
}
