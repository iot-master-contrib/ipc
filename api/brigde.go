package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/v3/pkg/curd"
	"ipc/types"
)

// @Summary 查询桥接数量
// @Schemes
// @Description 查询桥接数量
// @Tags bridge
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回桥接数量
// @Router /bridge/count [post]
func noopBridgeCount() {}

// @Summary 查询WebRTC-Bridge
// @Schemes
// @Description 查询WebRTC-Bridge
// @Tags bridge
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Bridge] 返回桥接信息
// @Router /bridge/search [post]
func noopBridgeSearch() {}

// @Summary 查询WebRTC-Bridge
// @Schemes
// @Description 查询WebRTC-Bridge
// @Tags bridge
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Bridge] 返回桥接信息
// @Router /bridge/list [get]
func noopBridgeList() {}

// @Summary 创建WebRTC-Bridge
// @Schemes
// @Description 创建WebRTC-Bridge
// @Tags bridge
// @Param search body types.Bridge true "桥接信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/create [post]
func noopBridgeCreate() {}

// @Summary 修改WebRTC-Bridge
// @Schemes
// @Description 修改WebRTC-Bridge
// @Tags bridge
// @Param id path int true "桥接ID"
// @Param bridge body types.Bridge true "桥接信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/{id} [post]
func noopBridgeUpdate() {}

// @Summary 获取WebRTC-Bridge
// @Schemes
// @Description 获取WebRTC-Bridge
// @Tags bridge
// @Param id path int true "桥接ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/{id} [get]
func noopBridgeGet() {}

// @Summary 删除WebRTC-Bridge
// @Schemes
// @Description 删除WebRTC-Bridge
// @Tags bridge
// @Param id path int true "桥接ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/{id}/delete [get]
func noopBridgeDelete() {}

// @Summary 启用WebRTC-Bridge
// @Schemes
// @Description 启用WebRTC-Bridge
// @Tags bridge
// @Param id path int true "桥接ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/{id}/enable [get]
func noopBridgeEnable() {}

// @Summary 禁用WebRTC-Bridge
// @Schemes
// @Description 禁用WebRTC-Bridge
// @Tags bridge
// @Param id path int true "桥接ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Bridge] 返回桥接信息
// @Router /bridge/{id}/disable [get]
func noopBridgeDisable() {}

// @Summary 导出WebRTC-Bridge
// @Schemes
// @Description 导出WebRTC-Bridge
// @Tags product
// @Accept json
// @Produce octet-stream
// @Router /bridge/export [get]
func noopBridgeExport() {}

// @Summary 导入WebRTC-Bridge
// @Schemes
// @Description 导入WebRTC-Bridge
// @Tags product
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回桥接数量
// @Router /bridge/import [post]
func noopBridgeImport() {}

func bridgeRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.Bridge]())
	app.POST("/search", curd.ApiSearch[types.Bridge]())
	app.GET("/list", curd.ApiList[types.Bridge]())
	app.POST("/create", curd.ApiCreateHook[types.Bridge](curd.GenerateRandomId[types.Bridge](8), nil))
	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.Bridge]())
	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.Bridge](nil, nil,
		"id", "product_id", "name", "desc", "crontab", "aggregators", "disabled"))
	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.Bridge](nil, nil))
	app.GET("/export", curd.ApiExport[types.Bridge]("bridge"))
	app.POST("/import", curd.ApiImport[types.Bridge]())

	app.GET(":id/disable", curd.ParseParamStringId, curd.ApiDisableHook[types.Bridge](true, nil, nil))
	app.GET(":id/enable", curd.ParseParamStringId, curd.ApiDisableHook[types.Bridge](false, nil, nil))
}
