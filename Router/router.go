package router

import (
	realtimechat "hack/real_time_chat"
	voyagerrouting "hack/voyagerRouting"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	ginApp = gin.Default()
)

func CORS(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")

	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": 200, "message": "Server is UP and running",
	})
}
func HandleRequest() {
	gin.SetMode(gin.DebugMode)
	// CreateGinLog()
	ginApp.Use(CORS)
	ginApp.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"*"},

		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	ginApp.Use(static.Serve("/", static.LocalFile("./web", false)))

	ginApp.GET("/healthcheck", HealthCheck)

	// no route redirect to frontend app
	ginApp.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"status": 404, "message": "Invalid Endpoint Request"})
	})
	ApplyRoutes(&ginApp.RouterGroup)

	ginApp.Run(":6060")
}

func ApplyRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/v1.0")
	{
		voyagerrouting.VoyagerApplyRoutes(v1)
		realtimechat.RealTimeVoyagerApplyRoutes(v1)
		// suiRouter.SuiApplyRoutes(v1)
	}
}
