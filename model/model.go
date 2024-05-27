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
	Interest    string    `json:"interest"`
	Location    string    `json:"location"`
}
type VoyagerRandomeMessages struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	SenderUserId uuid.UUID `json:"senderUserId" gorm:"type:uuid"`
	Content      string    `json:"content"`
	// Username      string    `json:"username"`
	ReciverUserId uuid.UUID `json:"reciverUserId" gorm:"type:uuid"`
	CreatedAt     time.Time `json:"created_at"`
}
type UserFriendsMap struct {
	ID      uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	UserId  uuid.UUID `gorm:"not null" json:"userId"`
	Friends uuid.UUID `gorm:"not null" json:"friends"`
}

type UserFriendsMapResponse struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	UserId      uuid.UUID `gorm:"not null" json:"userId"`
	UserName    string    `json:"userName"`
	Friends     uuid.UUID `gorm:"not null" json:"friends"`
	FriendsName string    `json:"friendsName"`
}
