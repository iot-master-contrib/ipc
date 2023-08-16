package ipc

import (
	"embed"
	"encoding/json"
	"github.com/iot-master-contrib/ipc/api"
	_ "github.com/iot-master-contrib/ipc/docs"
	"github.com/iot-master-contrib/ipc/types"
	"github.com/zgwit/iot-master/v3/model"
	"github.com/zgwit/iot-master/v3/pkg/db"
	"github.com/zgwit/iot-master/v3/pkg/log"
	"github.com/zgwit/iot-master/v3/pkg/mqtt"
	"github.com/zgwit/iot-master/v3/pkg/web"
	"net/http"
)

func App() *model.App {
	return &model.App{
		Id:   "ipc",
		Name: "IP摄像头",
		Entries: []*model.AppEntry{{
			Path: "app/ipc/camera",
			Name: "摄像头",
		}},
		Type:    "tcp",
		Address: "http://localhost" + web.GetOptions().Addr,
		Icon:    "/app/ipc/assets/camera.svg",
	}
}

//go:embed all:app/ipc
var wwwFiles embed.FS

// @title 历史数据接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/ipc/api/
// @query.collection.format multi
func main() {
}

func Startup(app *web.Engine) error {

	//同步表结构
	err := db.Engine.Sync2(
		new(types.Camera),
	)
	if err != nil {
		log.Fatal(err)
	}

	//注册前端接口
	api.RegisterRoutes(app.Group("/app/ipc/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(app.Group("/app/ipc"), "ipc")

	return nil
}

func Register() error {
	payload, _ := json.Marshal(App())
	token := mqtt.Publish("master/register", payload)
	token.Wait()
	return token.Error()
}

func Static(fs *web.FileSystem) {
	//前端静态文件
	fs.Put("/app/ipc", http.FS(wwwFiles), "", "app/ipc/index.html")
}

func Shutdown() error {

	//只关闭Web就行了，其他通过defer关闭

	return nil
}
