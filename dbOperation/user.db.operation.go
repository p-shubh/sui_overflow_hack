package dboperation

import (
	"fmt"
	dbflow "hack/dbFlow"
	"hack/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func VoyagerUserApplyRoutes(p *gin.RouterGroup) {
	r := p.Group("/user")
	{
		// Routes
		r.GET("/all", GetUsers)
		r.GET("/:id", GetUser)
		r.GET("/sub-id/:sub_id", GetUserBySubId)
		r.GET("/location-interest/:interest/:location", GetUsersByLocationAndCategory)
		r.GET("/list-users-interest/:interest/:userId", GetUsersByInterestAndUserId)
		r.PATCH("/user-details/:name/:userId", PatchUsersByInterestAndUserId)
		r.POST("", CreateUser)
		r.PUT("/:id", UpdateUser)
		r.DELETE("/:id", DeleteUser)
		r.PATCH("", PatchUserBySubId)
	}
}

// GetUsers retrieves all users
func GetUsers(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	var users []model.User
	db.Find(&users)
	c.JSON(200, users)
}

// GetUser retrieves a specific user
func GetUser(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	id := c.Params.ByName("id")
	var user model.User
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
	var user model.User
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
	var user model.User
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
	id := c.Params.ByName("sub_id")
	var user model.User
	if err := db.Where("sub_id = ?", id).First(&user).Error; err != nil {
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
	var user model.User
	db.Where("id = ?", id).Delete(&user)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func PatchUserBySubId(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()

	var user, input model.User

	// Bind the JSON payload to a map to allow partial updates
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the user exists
	if err := db.Where("sub_id = ?", input.SubID).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	input.UserAddress = user.UserAddress

	// Update the user with the input data
	if err := db.Model(&user).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}
func GetUsersByLocationAndCategory(c *gin.Context) {
	var db, close = dbflow.ConnectHackDatabase()
	defer close.Close()
	interest := c.Params.ByName("interest")
	location := c.Params.ByName("location")

	fmt.Println("GetUsersByLocationAndCategory data : ", interest, location)

	var users []model.User
	if interest != "" || location != "" {
		db.Where("interest = ? OR location = ?", interest, location).Find(&users)
	}
	c.JSON(http.StatusOK, users)
}

func GetUsersByInterestAndUserId(c *gin.Context) {
	db, close := dbflow.ConnectHackDatabase()
	defer close.Close()
	interest := c.Param("interest")
	userId := c.Param("userId")
	var (
		users []model.User
		user  model.User
		tx    *gorm.DB
	)

	if len(userId) > 0 {
		tx = db.Where("id = ?", userId).First(&user)
		if tx.Error != nil {
			if tx.Error == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
			return
		} else {
			user.Interest = interest
			if err := db.Save(&user).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			} else {
				if tx2 := db.Where("interest = ? AND id != ?", user.Interest, user.Id).Find(&users); tx2.Error != nil {
					if tx.Error == gorm.ErrRecordNotFound {
						c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
						return
					}
					c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
					return
				}
			}
		}
	}

	c.JSON(http.StatusOK, users)
}
func PatchUsersByInterestAndUserId(c *gin.Context) {
	db, close := dbflow.ConnectHackDatabase()
	defer close.Close()
	name := c.Param("name")
	userId := c.Param("userId")
	var (
		users []model.User
		user  model.User
		tx    *gorm.DB
	)

	if len(userId) > 0 {
		tx = db.Where("id = ?", userId).First(&user)
		if tx.Error != nil {
			if tx.Error == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
			return
		} else {
			user.Name = name
			if err := db.Save(&user).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			} else {
				if tx2 := db.Where("id != ?", user.Id).Find(&users); tx2.Error != nil {
					if tx.Error == gorm.ErrRecordNotFound {
						c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
						return
					}
					c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
					return
				}
			}
		}
	}

	c.JSON(http.StatusOK, users)
}
