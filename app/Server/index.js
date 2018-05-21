require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controller.js');
const PORT = 4000;
const session = require('express-session')
const massive = require('massive')

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    maxAge: (1000 * 60 * 60 * 24 * 14)
}));


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
});


app.listen(PORT, () => console.log("You are running on port 4000"));


