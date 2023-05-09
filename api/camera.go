package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/v3/pkg/curd"
	"ipc/types"
)

// @Summary 查询摄像头数量
// @Schemes
// @Description 查询摄像头数量
// @Tags camera
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回摄像头数量
// @Router /job/count [post]
func noopCameraCount() {}

// @Summary 查询摄像头
// @Schemes
// @Description 查询摄像头
// @Tags camera
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Camera] 返回摄像头信息
// @Router /camera/search [post]
func noopCameraSearch() {}

// @Summary 查询摄像头
// @Schemes
// @Description 查询摄像头
// @Tags camera
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Camera] 返回摄像头信息
// @Router /camera/list [get]
func noopCameraList() {}

// @Summary 创建摄像头
// @Schemes
// @Description 创建摄像头
// @Tags camera
// @Param search body types.Camera true "摄像头信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/create [post]
func noopCameraCreate() {}

// @Summary 修改摄像头
// @Schemes
// @Description 修改摄像头
// @Tags camera
// @Param id path int true "摄像头ID"
// @Param camera body types.Camera true "摄像头信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/{id} [post]
func noopCameraUpdate() {}

// @Summary 获取摄像头
// @Schemes
// @Description 获取摄像头
// @Tags camera
// @Param id path int true "摄像头ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/{id} [get]
func noopCameraGet() {}

// @Summary 删除摄像头
// @Schemes
// @Description 删除摄像头
// @Tags camera
// @Param id path int true "摄像头ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/{id}/delete [get]
func noopCameraDelete() {}

// @Summary 启用摄像头
// @Schemes
// @Description 启用摄像头
// @Tags camera
// @Param id path int true "摄像头ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/{id}/enable [get]
func noopCameraEnable() {}

// @Summary 禁用摄像头
// @Schemes
// @Description 禁用摄像头
// @Tags camera
// @Param id path int true "摄像头ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Camera] 返回摄像头信息
// @Router /camera/{id}/disable [get]
func noopCameraDisable() {}

// @Summary 导出摄像头
// @Schemes
// @Description 导出摄像头
// @Tags product
// @Accept json
// @Produce octet-stream
// @Router /camera/export [get]
func noopCameraExport() {}

// @Summary 导入摄像头
// @Schemes
// @Description 导入摄像头
// @Tags product
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回摄像头数量
// @Router /camera/import [post]
func noopCameraImport() {}

func cameraRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.Camera]())
	app.POST("/search", curd.ApiSearch[types.Camera]())
	app.GET("/list", curd.ApiList[types.Camera]())
	app.POST("/create", curd.ApiCreateHook[types.Camera](curd.GenerateRandomId[types.Camera](8), nil))
	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.Camera]())
	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.Camera](nil, nil,
		"id", "product_id", "name", "desc", "crontab", "aggregators", "disabled"))
	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.Camera](nil, nil))
	app.GET("/export", curd.ApiExport[types.Camera]("camera"))
	app.POST("/import", curd.ApiImport[types.Camera]())

	app.GET(":id/disable", curd.ParseParamStringId, curd.ApiDisableHook[types.Camera](true, nil, nil))
	app.GET(":id/enable", curd.ParseParamStringId, curd.ApiDisableHook[types.Camera](false, nil, nil))
}
