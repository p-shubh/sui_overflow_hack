package model

import "github.com/gofrs/uuid"

type User struct {
	UserAddress string    `json:"user_address"`
	SubID       string    `gorm:"unique" json:"sub_id"`
	Name        string    `json:"name"`
	Provider    string    `json:"provider"`
	Gender      string    `json:"gender"`
	UserId      uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"user_id"`
}
