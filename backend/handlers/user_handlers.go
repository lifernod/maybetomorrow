package handlers

import (
	"backend/database"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetUserById(c *fiber.Ctx) error {
	resp := ResponseUser{}
	return c.JSON(resp)
}

func GetCurrentMonthByUserId(c *fiber.Ctx) error {
	//USER_ID_COOKIE_HEADER := "user_id"
	yearMonth := new(struct {
		Year   int    `json:"year"`
		Month  int    `json:"month"`
	})
	if err := c.BodyParser(yearMonth); err != nil { return err }
	var month string
	if yearMonth.Month < 10 { month = fmt.Sprintf("0%d", yearMonth.Month) } else { month = fmt.Sprintf("%d", yearMonth.Month) }

	currentMonth, err := time.Parse("2006-01-02 15:04:05", fmt.Sprintf("%d-%s-01 00:00:00", yearMonth.Year, month))

	if err != nil { return fmt.Errorf("error while formating date: %w", err) }

	weeks := 1
	weekdayNumber := int(currentMonth.Weekday()) - 1
	if weekdayNumber < 0 { weekdayNumber = 6 }
	for i := 0 ; i < int(currentMonth.AddDate(0,1,-1).Day()) ; i++ {
		if weekdayNumber > 6 { weekdayNumber = 0 ; weeks++ }
		weekdayNumber++
	}

	resp := ResponseMonth{}
	resp.Days = make([][7]ResponseDay, weeks);
	resp.MonthNumber = byte(yearMonth.Month)

	weekNumber := 0
	weekdayNumber = int(currentMonth.Weekday()) - 1
	if weekdayNumber < 0 { weekdayNumber = 6 }
	for i := 0 ; i < int(currentMonth.AddDate(0,1,-1).Day()) ; i++ {
		resp.Days[weekNumber][weekdayNumber] = ResponseDay{-1, byte(i+1), byte(yearMonth.Month), database.DayUndefined, []int{}}
		weekdayNumber++
		if weekdayNumber > 6 { weekdayNumber = 0 ; weekNumber++ }
	}

	firstDayWeekNumber := int(currentMonth.Weekday()) - 1
	if firstDayWeekNumber < 0 { firstDayWeekNumber = 6 }
	daysInPrevMonth := int(currentMonth.AddDate(0,0,-1).Day())
	var prevMonth byte
	if yearMonth.Month > 1 { prevMonth = byte(yearMonth.Month - 1) } else { prevMonth = byte(12) }
	for i := 0 ; i < firstDayWeekNumber ; i++ {
		resp.Days[0][firstDayWeekNumber - i - 1] = ResponseDay{-1, byte(daysInPrevMonth - i), prevMonth, database.DayUneditable, []int{}}
	}

	lastDayWeekNumber := int(currentMonth.AddDate(0,1,-1).Weekday()) - 1
	var nextMonth byte
	if yearMonth.Month < 12 { nextMonth = byte(yearMonth.Month + 1) } else { nextMonth = byte(0) }
	if lastDayWeekNumber < 0 { lastDayWeekNumber = 6 }
	for i := 1 ; i < 7 - lastDayWeekNumber ; i++ {
		resp.Days[weeks-1][lastDayWeekNumber + i] = ResponseDay{-1, byte(i), nextMonth, database.DayUneditable, []int{}}
	}

	return c.JSON(resp)
}