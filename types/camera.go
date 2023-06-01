package types

import (
	"time"
)

type Camera struct {
	Id             string    `json:"id" xorm:"pk"`
	Name           string    `json:"name"`
	Desc           string    `json:"desc,omitempty"`
	Url            string    `json:"url,omitempty"`
	WebrtcStreamer string    `json:"webrtc_streamer,omitempty"`
	Disabled       bool      `json:"disabled,omitempty"`
	Created        time.Time `json:"created,omitempty" xorm:"created"`
}
