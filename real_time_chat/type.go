package realtimechat

import (
	"time"

	"github.com/google/uuid"
)

type VoyagerRandomeMessages struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primary_key;"`
	UserId    uuid.UUID `json:"userId" gorm:"type:uuid"`
	Content   string    `json:"content"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
}
