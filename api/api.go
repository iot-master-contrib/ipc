package api

import "github.com/gin-gonic/gin"

func RegisterRoutes(app *gin.RouterGroup) {

	cameraRouter(app.Group("/camera"))

	//configRouter(app.Group("/config"))
}
