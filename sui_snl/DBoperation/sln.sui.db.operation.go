package sln_sui_dboperation

import (
	dbflow "hack/dbFlow"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Define a struct to represent your table
type SlnSui struct {
	ID              uint      `gorm:"primaryKey"`
	GameID          int       `gorm:"column:game_id"`
	CreatedAt       time.Time `gorm:"column:created_at"`
	ContractAddress string    `gorm:"column:contract_address"`
}

func CreateSlnSui(c *gin.Context) {
	var db, lbpq = dbflow.ConnectHackDatabase()
	lbpq.Close()
	var newSlnSui SlnSui

	// Bind JSON data to the SlnSui struct
	if err := c.ShouldBindJSON(&newSlnSui); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set CreatedAt field to current time
	newSlnSui.CreatedAt = time.Now()

	// Save the new record to the database
	if err := db.Create(&newSlnSui).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the created record as JSON
	c.JSON(http.StatusOK, newSlnSui)
}
