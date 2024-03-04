const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '98oicv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    baseUrl: "https://pushing-it.vercel.app", 
  },
  env: {
    usuario: "pushingit",
    password: "123456!",
    baseUrlAPI: 'https://pushing-it.onrender.com/api',
    token: ''
  }
  
});
