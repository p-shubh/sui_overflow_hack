package realtimechat

import (
	"fmt"
	dbflow "hack/dbFlow"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	realtimego "github.com/overseedio/realtime-go"
)

// func handleConnections(c *gin.Context) {
// 	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
// 	if err != nil {
// 		log.Println(err)
// 		return
// 	}
// 	defer ws.Close()
// 	clients[ws] = true

// 	for {
// 		var msg Message
// 		err := ws.ReadJSON(&msg)
// 		if err != nil {
// 			log.Printf("error: %v", err)
// 			delete(clients, ws)
// 			break
// 		}
// 		broadcast <- msg
// 	}
// }

// func subscribeToRealtime() {
// 	client := supabase.NewClient(os.Getenv("SUPABASE_PROJECT_URL"), os.Getenv("SUPABASE_ANON_KEY"), nil)
// 	rtClient, err := realtime.NewClient(client)
// 	if err != nil {
// 		log.Fatalf("Error creating Realtime client: %v", err)
// 	}

// 	rtClient.On("postgres_changes", map[string]string{
// 		"schema": "public",
// 		"table":  "messages",
// 		"event":  "*",
// 	}, func(payload realtime.Payload) {
// 		log.Printf("Realtime message: %v", payload)

// 		msg := Message{
// 			ID:        payload.New["id"].(string),
// 			Content:   payload.New["content"].(string),
// 			Username:  payload.New["username"].(string),
// 			CreatedAt: payload.New["created_at"].(string),
// 		}

// 		broadcast <- msg
// 	})

// 	err = rtClient.Start()
// 	if err != nil {
// 		log.Fatalf("Error starting Realtime client: %v", err)
// 	}
// }

// func handleMessages() {
// 	db, dbClose := dbflow.ConnectHackDatabase()
// 	defer dbClose.Close()
// 	for {
// 		msg := <-broadcast

// 		for client := range clients {
// 			err := client.WriteJSON(msg)
// 			if err != nil {
// 				log.Printf("error: %v", err)
// 				client.Close()
// 				delete(clients, client)
// 			}
// 		}

// 		db.Create(&msg)
// 	}
// }

// Message represents a chat message
// type Message struct {
// 	ID        uint      `json:"id" gorm:"primaryKey"`
// 	Content   string    `json:"content"`
// 	Username  string    `json:"username"`
// 	CreatedAt time.Time `json:"created_at"`
// }

// var db *gorm.DB
var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan VoyagerRandomeMessages)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
var mutex = &sync.Mutex{}

func RealtimeChatVoigerConnection() {
	var ENDPOINT = os.Getenv("SUPABASE_PROJECT_URL")
	var API_KEY = os.Getenv("SUPABASE_ANON_KEY")
	var RLS_TOKEN = os.Getenv("SUPABASE_RLS_TOKEN")

	c, err := realtimego.NewClient(ENDPOINT, API_KEY, realtimego.WithUserToken(RLS_TOKEN))
	if err != nil {
		log.Fatal(err)
	}

	err = c.Connect()
	if err != nil {
		log.Fatal(err)
	}

	dbName := os.Getenv("SUPABASE_DB_NAME")
	schema := os.Getenv("SCHEMA")
	table := os.Getenv("TABLE")
	ch, err := c.Channel(realtimego.WithTable(&dbName, &schema, &table))
	if err != nil {
		log.Fatal(err)
	}

	ch.OnInsert = func(m realtimego.Message) {
		log.Println("***ON INSERT....", m)
	}
	ch.OnDelete = func(m realtimego.Message) {
		log.Println("***ON DELETE....", m)
	}
	ch.OnUpdate = func(m realtimego.Message) {
		log.Println("***ON UPDATE....", m)
	}

	err = ch.Subscribe()
	if err != nil {
		log.Fatal(err)
	}
}

func RealTimeVoyagerApplyRoutes(p *gin.RouterGroup) {
	r := p.Group("/voyager_web_socket/")
	{
		r.POST("/messages", CreateMessage)
		r.GET("/messages", GetMessages)
		r.GET("/ws", HandleWebSocket)
		go HandleMessages()
	}
}

func HandleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}
	db, dbClose := dbflow.ConnectHackDatabase()
	defer dbClose.Close()
	defer conn.Close()

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	for {
		var message VoyagerRandomeMessages
		err := conn.ReadJSON(&message)
		if err != nil {
			log.Printf("WebSocket read error: %v", err)
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()
			break
		}

		// Save the received message to the database
		message.CreatedAt = time.Now()
		message.ID = uuid.New()
		if err := db.Create(&message).Error; err != nil {
			log.Printf("Database insert error: %v", err)
			continue
		}

		// Broadcast the message to other clients
		broadcast <- message

	}
}

func HandleMessages() {
	for {
		message := <-broadcast
		mutex.Lock()
		for client := range clients {
			err := client.WriteJSON(message)
			if err != nil {
				log.Printf("WebSocket error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
		mutex.Unlock()
	}
}

func CreateMessage(c *gin.Context) {
	db, dbClose := dbflow.ConnectHackDatabase()
	defer dbClose.Close()
	var message VoyagerRandomeMessages
	message.ID = uuid.New()
	fmt.Println("message.ID = ", message.ID)
	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	message.CreatedAt = time.Now()
	if err := db.Create(&message).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, message)
}

func GetMessages(c *gin.Context) {
	db, dbClose := dbflow.ConnectHackDatabase()
	defer dbClose.Close()
	var messages []VoyagerRandomeMessages
	if err := db.Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, messages)
}
