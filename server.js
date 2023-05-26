// Import modules
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import objects/instances
const routes = require("./controllers");
const sequelize = require("./config/connection");

// Create express server app
const app = express();
const PORT = process.env.PORT || 3001;

// Create a session object and link it with sequelize
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));

// Express server middleware required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express server routes
app.use(routes);

// Sync sequelize models and run server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening, launch app in browser: http://localhost:${PORT}`);
    });
});