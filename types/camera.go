package types

import "github.com/zgwit/iot-master/v3/model"

type Camera struct {
	Id       string     `json:"id" xorm:"pk"`
	BridgeId string     `json:"ipc_id" xorm:"index"`
	Name     string     `json:"name"`
	Desc     string     `json:"desc,omitempty"`
	Url      string     `json:"url,omitempty"`
	Disabled bool       `json:"disabled,omitempty"`
	Created  model.Time `json:"created,omitempty" xorm:"created"`
}
