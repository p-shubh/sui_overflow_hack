package suiSlnRouter

import (
	sln_sui_dboperation "hack/sui_snl/DBoperation"

	"github.com/gin-gonic/gin"
)

func SuiSlnApplyRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/snl")
	{
		v1.GET("/insert-address", sln_sui_dboperation.CreateSlnSui)
	}
}
