package realtimechat

import (
	"time"

	"github.com/google/uuid"
)

type VoyagerRandomeMessages struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primary_key;"`
	UserId    int    `json:"userId" gorm:"type:integer"`
	Content   string `json:"content"`
	Username  string `json:"username"`
	CreatedAt time.Time `json:"created_at"`
}
