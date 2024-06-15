package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

type AuthRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type AuthResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}

var authFilePath = filepath.Join("..", "auth.json")
var loginStatusFilePath = filepath.Join("..", "login-status.json")

func Login(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	json.NewDecoder(r.Body).Decode(&req)

	// 正しい名前とメールアドレスを定義
	validName := "test"
	validEmail := "test@test.com"

	if req.Name == validName && req.Email == validEmail {
		authData := map[string]string{"name": req.Name, "email": req.Email}
		authDataJSON, _ := json.Marshal(authData)
		loginStatusJSON, _ := json.Marshal(map[string]bool{"loggedIn": true})

		// ファイルに書き込み
		os.WriteFile(authFilePath, authDataJSON, 0644)
		os.WriteFile(loginStatusFilePath, loginStatusJSON, 0644)

		message := fmt.Sprintf("\n>>> ログイン情報 <<<\nユーザー名: %s\nメールアドレス: %s\n", req.Name, req.Email)
		fmt.Println(message)

		response := AuthResponse{Message: "Logged in successfully", Success: true}
		json.NewEncoder(w).Encode(response)
	} else {
		response := AuthResponse{Message: "ログインできませんでした。名前・メールアドレスが正しいかご確認ください。", Success: false}
		json.NewEncoder(w).Encode(response)
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	if _, err := os.Stat(authFilePath); err == nil {
		os.Remove(authFilePath)
		fmt.Println("Logged out and removed auth file.")
	}
	if _, err := os.Stat(loginStatusFilePath); err == nil {
		os.Remove(loginStatusFilePath)
	}

	response := AuthResponse{Message: "Logged out successfully", Success: true}
	json.NewEncoder(w).Encode(response)
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {
	authData, err := os.ReadFile(authFilePath)
	if err != nil || len(authData) == 0 || !isLoggedIn(authData) {
		response := AuthResponse{Message: "ログインが必要です", Success: false}
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(response)
		return
}


	response := AuthResponse{Message: "Authenticated", Success: true}
	json.NewEncoder(w).Encode(response)
}

func isLoggedIn(authData []byte) bool {
	var authInfo map[string]string
	json.Unmarshal(authData, &authInfo)

	if authInfo["name"] != "" && authInfo["email"] != "" {
		return true
	}
	return false
}
