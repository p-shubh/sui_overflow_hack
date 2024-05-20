package dbflow

import (
	"hack/model"
	"log"
)

func DbTest() {
	db, lb_pq := ConnectHackDatabase()
	defer lb_pq.Close()
	if db.Error != nil {
		log.Println("[ ERROR ] DbTest :Failed to connect db : ", db.Error.Error())
	}
	db.AutoMigrate(
		&model.User{},
		&model.VoyagerRandomeMessages{},
	)
}
