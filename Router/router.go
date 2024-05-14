package router

import (
	"fmt"
	voyagerrouting "hack/voyagerRouting"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	ginApp = gin.Default()
)

func HandleRequest() {
	gin.SetMode(gin.DebugMode)
	// CreateGinLog()
	// router.Use(CORS)
	ginApp.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"https://auth.flexabledats.com", "https://portal.flexabledats.com", "https://marketplace.flexabledats.com"},
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"*"},

		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	ginApp.Use(static.Serve("/", static.LocalFile("./web", false)))

	// ginApp.GET("/healthcheck", v1.HealthCheck)

	// no route redirect to frontend app
	ginApp.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"status": 404, "message": "Invalid Endpoint Request"})
	})
	ApplyRoutes(&ginApp.RouterGroup)
	/* ***********************************SHIFT TO v1.go********************************* */
	ginApp.Run(":6060")
}

func ApplyRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/v1.0")
	{
		fmt.Println("---------------------------------------------------------------------------------------------------------------------------------------")
		fmt.Println("---------------------------------------------------------------------------------------------------------------------------------------")
		fmt.Println("---------------------------------------------------------------------------------------------------------------------------------------")
		fmt.Println("**************************************************   [*] HACKATHONE APIS [*]   ********************************************************")
		fmt.Println("---------------------------------------------------------------------------------------------------------------------------------------")
		fmt.Println("---------------------------------------------------------------------------------------------------------------------------------------")

		voyagerrouting.VoyagerApplyRoutes(v1)
		// suiRouter.SuiApplyRoutes(v1)
	}
}
