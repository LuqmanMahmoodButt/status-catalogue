const express = require('express')
require('dotenv').config()

const session = require('express-session')
const mongoose = require("mongoose")
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "public")))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

app.get("/", (req, res) => {
    res.render('home.ejs', { user: req.session.user })
})