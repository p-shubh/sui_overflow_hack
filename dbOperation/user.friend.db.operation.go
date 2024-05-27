package dboperation

import (
	dbflow "hack/dbFlow"
	"hack/model"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserFriendsMapApplyRoutes(p *gin.RouterGroup) {
	r := p.Group("/user_friends")
	{
		// Routes
		r.POST("", createUserFriends)
		// r.GET("/get_friends/:id", getUserFriends)
		r.PUT("/:id", updateUserFriends)
		// r.DELETE("/user_friends/delete/:id", deleteUserFriends)
		r.DELETE("/:user_id/:friend_id", deleteUserFriendsByIDs)
		r.GET("/:user_id", getUsersByUserId)
	}
}

// Create user friends
func createUserFriends(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var input model.UserFriendsMap
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create UserFriendsMap record
	if err := db.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, input)
}

// Get user friends by ID
func getUserFriends(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var userFriends model.UserFriendsMap
	id := c.Param("id")
	if err := db.Where("id = ?", id).First(&userFriends).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, userFriends)
}

// Update user friends by ID
func updateUserFriends(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Param("id")
	var userFriends model.UserFriendsMap
	if err := db.Where("id = ?", id).First(&userFriends).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}

	var input model.UserFriendsMap
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields
	userFriends.UserId = input.UserId
	userFriends.Friends = input.Friends

	// Save updated record
	db.Save(&userFriends)

	c.JSON(http.StatusOK, userFriends)
}

// Delete user friends by ID
func deleteUserFriends(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Param("id")
	var userFriends model.UserFriendsMap
	if err := db.Where("id = ?", id).First(&userFriends).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}

	// Delete the record
	db.Delete(&userFriends)

	c.JSON(http.StatusOK, gin.H{"message": "UserFriendsMap deleted successfully"})
}

// Delete user friends by User ID and Friend ID
func deleteUserFriendsByIDs(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	userID := c.Param("user-id")
	friendID := c.Param("friend-id")

	var userFriends model.UserFriendsMap
	if err := db.Where("userId = ? AND friends = ?", userID, friendID).First(&userFriends).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}

	// Delete the record
	db.Delete(&userFriends)

	c.JSON(http.StatusOK, gin.H{"message": "UserFriendsMap deleted successfully"})
}

// Get users by User ID
func getUsersByUserId(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	userID := c.Param("user_id")
	var userFriends []model.UserFriendsMapResponse
	err := db.Table("user_friends_maps").
		Select("user_friends_maps.id, user_friends_maps.user_id, User1.name as user_name, user_friends_maps.friends, friends.name as friends_name").
		Joins("LEFT JOIN users AS User1 ON User1.id = user_friends_maps.user_id").
		Joins("LEFT JOIN users AS friends ON friends.id = user_friends_maps.friends").
		Where("user_friends_maps.user_id = ? OR user_friends_maps.friends = ?", userID, userID).
		Scan(&userFriends).Error
	if err != nil {
		log.Println("Failed to execute the query:", err)
		return
	}

	c.JSON(http.StatusOK, userFriends)
}
