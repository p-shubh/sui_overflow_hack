package dbflow

import (
	"log"
)

func DbTest() {
	db, lb_pq := ConnectHackDatabase()
	defer lb_pq.Close()
	if db.Error != nil {
		log.Println("[ ERROR ] DbTest :Failed to connect db : ", db.Error.Error())
	}
	// func() {
	// 	db.AutoMigrate(
	// 		&model.User{},
	// 		&model.VoyagerRandomeMessages{},
	// 		&model.UserFriendsMap{},
	// 	)
	// }()

}
