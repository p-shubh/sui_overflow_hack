package dboperation

import (
	dbflow "hack/dbFlow"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func VoyagerUserApplyRoutes(p *gin.RouterGroup) {
	r := p.Group("")
	{
		// Routes
		r.GET("/users", GetUsers)
		r.GET("/users/:id", GetUser)
		r.GET("/users/sub-id/:sub_id", GetUserBySubId)
		r.POST("/users", CreateUser)
		r.PUT("/users/:id", UpdateUser)
		r.DELETE("/users/:id", DeleteUser)
	}

}

// GetUsers retrieves all users
func GetUsers(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var users []User
	db.Find(&users)
	c.JSON(200, users)
}

// GetUser retrieves a specific user
func GetUser(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Params.ByName("id")
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}
	c.JSON(200, user)
}

func GetUserBySubId(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	subId := c.Params.ByName("sub_id")
	var user User
	if err := db.Where("sub_id = ?", subId).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

// CreateUser creates a new user
func CreateUser(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&user).Error; err != nil {
		if err.Error() == "duplicate key value violates unique constraint \"users_sub_id_key\" (SQLSTATE 23505)" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "warning": "User already Exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

// UpdateUser updates a user
func UpdateUser(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Params.ByName("id")
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}
	c.BindJSON(&user)
	db.Save(&user)
	c.JSON(200, user)
}

// DeleteUser deletes a user
func DeleteUser(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Params.ByName("id")
	var user User
	db.Where("id = ?", id).Delete(&user)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
