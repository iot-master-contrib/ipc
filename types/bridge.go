package types

import "github.com/zgwit/iot-master/v3/model"

type Bridge struct {
	Id      string     `json:"id" xorm:"pk"`
	Name    string     `json:"name"`
	Desc    string     `json:"desc,omitempty"`
	Created model.Time `json:"created,omitempty" xorm:"created"`
}
