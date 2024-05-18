package main

import (
	router "hack/Router"
	realtimechat "hack/real_time_chat"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	if os.Getenv("LOAD_CONFIG_FILE") == "" {
		// Load environment variables from .env file
		err := godotenv.Load()
		if err != nil {
			log.Printf("Error in reading the config file : %v\n", err)
		}
	}

	realtimechat.RealtimeChatVoigerConnection()

	router.HandleRequest()
}