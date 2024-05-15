package main

import (
	router "hack/Router"
)

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	router.HandleRequest()
}
