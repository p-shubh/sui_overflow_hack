package voyagerrouting

import (
	dboperation "hack/dbOperation"

	"github.com/gin-gonic/gin"
)

func VoyagerApplyRoutes(p *gin.RouterGroup) {
	r := p.Group("/voyager")
	{
		// GET API for people listing according to interest or location

		r.GET("/people", dboperation.GetPeople)

		// POST API to send friend request
		r.POST("/friend-request", dboperation.SendFriendRequest)

		// GET API to get all accepted friend requests
		r.GET("/friend-requests", dboperation.GetAcceptedFriendRequests)

		// Web chat between friends
		r.POST("/chat", dboperation.SendMessage)

		// GET dropdown API for profile of all interests
		r.GET("/interests", dboperation.GetInterests)

		// GET dropdown API for all locations
		r.GET("/locations", dboperation.GetLocations)

		// POST API for adding interest and location in the profile section
		r.POST("/profile", dboperation.AddProfileInfo)

		// Define routes for categories
		r.POST("/categories", dboperation.CreateCategory)
		r.GET("/categories/:categorie", dboperation.GetCategory)
		r.PUT("/categories/:id", dboperation.UpdateCategory)
		r.DELETE("/categories/:id", dboperation.DeleteCategory)

	}
}
