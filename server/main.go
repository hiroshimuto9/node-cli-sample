package main

import (
	"log"
	"net/http"
	"github.com/hiroshimuto9/node-cli-sample/server/handlers"
)

func main() {
	http.HandleFunc("/login", handlers.Login)
	http.HandleFunc("/check-auth", handlers.CheckAuth)
	http.HandleFunc("/logout", handlers.Logout)

	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
