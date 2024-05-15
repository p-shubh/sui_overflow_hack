package dboperation

import (
	dbflow "hack/dbFlow"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Person struct {
	ID       uint `gorm:"primaryKey"`
	Name     string
	Location string
	Interest string
}

type FriendRequest struct {
	ID         uint `gorm:"primaryKey"`
	SenderID   uint
	ReceiverID uint
	Status     string
}

type Chat struct {
	ID         uint `gorm:"primaryKey"`
	SenderID   uint
	ReceiverID uint
	Message    string
	CreatedAt  time.Time
}

func GetPeople(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var people []Person
	db.Find(&people)
	c.JSON(http.StatusOK, people)
}

func SendFriendRequest(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var request FriendRequest
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&request)
	c.JSON(http.StatusCreated, request)
}

func GetAcceptedFriendRequests(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var requests []FriendRequest
	db.Where("status = ?", "accepted").Find(&requests)
	c.JSON(http.StatusOK, requests)
}

func SendMessage(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var chat Chat
	if err := c.BindJSON(&chat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&chat)
	c.JSON(http.StatusCreated, chat)
}

func GetInterests(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var interests []string
	db.Model(&Person{}).Pluck("DISTINCT interest", &interests)
	c.JSON(http.StatusOK, interests)
}

func GetLocations(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var locations []string
	db.Model(&Person{}).Pluck("DISTINCT location", &locations)
	c.JSON(http.StatusOK, locations)
}

func AddProfileInfo(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var person Person
	if err := c.BindJSON(&person); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&person)
	c.JSON(http.StatusCreated, person)
}

func jkbnds() {
	var notUsableTopics = []string{"Data Structures and Algorithms",
		"Database Management Systems (DBMS)",
		"Computer Networks"}
	addingValidation := ""

	if len(notUsableTopics) != 0 {
		addingValidation += `Do not add these under below topics in the response  := 
		
		`

		for i, _ := range notUsableTopics {
			addingValidation += notUsableTopics[i]
		}
	}

}

// CRUD operations for categories
func CreateCategory(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var category Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&category)
	c.JSON(http.StatusCreated, category)
}

func GetCategory(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var categories []Category
	if err := db.Where("category = ?", c.Param("categorie")).Find(&categories).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	c.JSON(http.StatusOK, categories)
}

func UpdateCategory(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var category Category
	if err := db.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Save(&category)
	c.JSON(http.StatusOK, category)
}

func DeleteCategory(c *gin.Context) {
	var db,close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var category Category
	if err := db.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	db.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}
