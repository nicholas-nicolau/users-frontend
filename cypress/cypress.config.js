const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    specPattern: ["e2e/**/**/*.cy.ts", "e2e/**/**/**/*.cy.ts"],
    videosFolder: "videos",
    screenshotsFolder: "screenshots",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:8080"
  },
  retries: 1
});
