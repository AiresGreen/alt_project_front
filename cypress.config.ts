import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // 🔥 Définition du localhost
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // 📝 Emplacement des tests
    supportFile: "cypress/support/e2e.js", // 📌 Fichier support
    viewportWidth: 1280, // 📏 Taille écran (modifiable)
    viewportHeight: 720,
    defaultCommandTimeout: 8000, // ⏳ Timeout pour les commandes Cypress
    requestTimeout: 10000, // ⏳ Timeout pour les requêtes HTTP
    retries: 3, // 🔄 Nombre de tentatives en cas d'échec
    video: false, // 🎥 Désactiver l'enregistrement des vidéos (activer si besoin)
    screenshotOnRunFailure: true, // 📸 Capture d'écran en cas d'erreur
    chromeWebSecurity: false, // 🚨 Désactiver certaines sécurités si besoin (CORS)
    experimentalStudio: true, // ⚡ Activer l'enregistrement interactif des tests

    },
  })
