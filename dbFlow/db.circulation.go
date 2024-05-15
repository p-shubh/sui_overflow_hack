package dbflow

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectHackDatabase() *gorm.DB {
	// Connect to the database
	dbHost := os.Getenv("SUPABASE_DB_HOST")
	dbUsername := os.Getenv("SUPABASE_DB_USERNAME")
	dbPassword := os.Getenv("SUPABASE_DB_PASSWORD")
	dbName := os.Getenv("SUPABASE_DB_NAME")
	dbPort := os.Getenv("SUPABASE_DB_PORT")

	// Construct the connection string
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=require TimeZone=Asia/Shanghai",
		dbHost, dbUsername, dbPassword, dbName, dbPort)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// // Auto migrate the schema
	// db.AutoMigrate(&SlnSui{})
	return db

}
