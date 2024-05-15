package dbflow

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectHackDatabase() *gorm.DB {
	// Load environment variables
	dbHost := os.Getenv("SUPABASE_DB_HOST")
	dbUsername := os.Getenv("SUPABASE_DB_USERNAME")
	dbPassword := os.Getenv("SUPABASE_DB_PASSWORD")
	dbName := os.Getenv("SUPABASE_DB_NAME")
	dbPort := os.Getenv("SUPABASE_DB_PORT")

	// Construct the connection string
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUsername, dbPassword, dbName)

	// Attempt to connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Optionally, you can enable automatic migrations
	// db.AutoMigrate(&YourModel{})

	return db
}
