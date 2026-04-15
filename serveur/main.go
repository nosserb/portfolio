package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	// Chemin vers le dossier du portfolio
	portfolioPath := ".."

	// Servir les fichiers statiques
	fs := http.FileServer(http.Dir(portfolioPath))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		cleanPath := filepath.Clean("/" + r.URL.Path)
		relativePath := strings.TrimPrefix(cleanPath, "/")
		fullPath := filepath.Join(portfolioPath, relativePath)

		fileInfo, err := os.Stat(fullPath)
		if err == nil {
			if fileInfo.IsDir() {
				indexPath := filepath.Join(fullPath, "index.html")
				if _, indexErr := os.Stat(indexPath); indexErr == nil {
					http.ServeFile(w, r, indexPath)
					return
				}
			} else {
				fs.ServeHTTP(w, r)
				return
			}
		}

		w.WriteHeader(http.StatusNotFound)
		http.ServeFile(w, r, filepath.Join(portfolioPath, "404.html"))
	})

	// Configuration et démarrage du serveur
	port := "8080"
	fmt.Printf("Serveur démarré sur http://localhost:%s\n", port)
	fmt.Printf("Serveur le portfolio depuis: %s\n", portfolioPath)

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
