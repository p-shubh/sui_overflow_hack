package dboperation

type Category struct {
	ID       uint   `gorm:"primaryKey"`
	Category string `gorm:"size:225"`
	Name     string `gorm:"size:255"`
}