package model

import (
	"time"

	"github.com/gofrs/uuid"
)

type User struct {
	Id          uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	UserAddress string    `json:"user_address"`
	SubID       string    `gorm:"unique" json:"sub_id"`
	Name        string    `json:"name"`
	Provider    string    `json:"provider"`
	Gender      string    `json:"gender"`
	
}
type VoyagerRandomeMessages struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	UserId     uuid.UUID `json:"userId" gorm:"type:uuid"`
	Content    string    `json:"content"`
	Username   string    `json:"username"`
	CommonPass string    `gorm:"type:text;" json:"commonPass"`
	CreatedAt  time.Time `json:"created_at"`
}
