package api

import "github.com/gin-gonic/gin"

func RegisterRoutes(app *gin.RouterGroup) {

	bridgeRouter(app.Group("/bridge"))

	cameraRouter(app.Group("/camera"))

	//configRouter(app.Group("/config"))
}
