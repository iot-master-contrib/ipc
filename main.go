package main

import (
	"embed"
	"encoding/json"
	"github.com/zgwit/iot-master/v3/model"
	"github.com/zgwit/iot-master/v3/pkg/banner"
	"github.com/zgwit/iot-master/v3/pkg/build"
	"github.com/zgwit/iot-master/v3/pkg/db"
	"github.com/zgwit/iot-master/v3/pkg/log"
	"github.com/zgwit/iot-master/v3/pkg/mqtt"
	"github.com/zgwit/iot-master/v3/pkg/web"
	"ipc/api"
	"ipc/config"
	_ "ipc/docs"
	"ipc/types"
	"net/http"
)

//go:embed all:app/ipc
var wwwFiles embed.FS

// @title 历史数据接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/ipc/api/
// @query.collection.format multi
func main() {
	banner.Print("iot-master-plugin:ipc")
	build.Print()

	config.Load()

	err := log.Open()
	if err != nil {
		log.Fatal(err)
	}

	//加载数据库
	err = db.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//同步表结构
	err = db.Engine.Sync2(
		new(types.Bridge), new(types.Camera),
	)
	if err != nil {
		log.Fatal(err)
	}

	//MQTT总线
	err = mqtt.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer mqtt.Close()

	//注册应用
	//for _, v := range config.Config.Apps {
	payload, _ := json.Marshal(model.App{
		Id:   "ipc",
		Name: "IP摄像头",
		Entries: []model.AppEntry{{
			Path: "app/ipc/camera",
			Name: "摄像头",
		}, {
			Path: "app/ipc/bridge",
			Name: "桥接器",
		}},
		Type:    "tcp",
		Address: "http://localhost" + web.GetOptions().Addr,
	})
	_ = mqtt.Publish("master/register", payload, false, 0)
	//}

	app := web.CreateEngine()

	//注册前端接口
	api.RegisterRoutes(app.Group("/app/ipc/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(app.Group("/app/ipc"))

	//前端静态文件
	app.RegisterFS(http.FS(wwwFiles), "", "app/ipc/index.html")

	//监听HTTP
	app.Serve()
}
