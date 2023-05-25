// Import modules
const express = require("express");

// Import objects/instances
// const routes = require("./controllers");
const sequelize = require("./config/connection");

// Creaet express server app
const app = express();
const PORT = process.env.PORT || 3001;

// Express server middleware required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express server routes
// app.use(routes);

// Sync sequelize models and run server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening, launch app in browser: http://localhost:${PORT}`);
    });
});