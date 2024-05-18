package dboperation

type Category struct {
	ID       uint   `gorm:"primaryKey"`
	Category string `gorm:"size:225"`
	Name     string `gorm:"size:255"`
}

// User model
type User struct {
	ID          uint   `gorm:"primary_key" json:"id"`
	UserAddress string `json:"user_address"`
	SubID       string `json:"sub_id"`
	Name        string `json:"name"`
	Provider    string `json:"provider"`
	Gender      string `json:"gender"`
}
