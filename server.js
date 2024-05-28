const express = require('express')
require('dotenv').config()

const session = require('express-session')
const mongoose = require("mongoose")
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path")
const Status = require('./models/status')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const authController = require("./controllers/auth.js")

app.use(express.static(path.join(__dirname, "public")))

mongoose.connect(process.env.MONGODB_URI)




app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
    )
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use("/auth", authController);

app.get("/", (req, res) => {
    res.render('home.ejs')
})
// ! GET request 
app.get('/add-status', (req, res) => {
    res.render('new.ejs')
})

app.get('/status', async (req, res) => {
    // i need to get the actual fries
    const status = await Status.find()
    // send them back
    res.render('status.ejs', {
        status: status,
        user: req.session.user
    })
})



// ! POST request 
app.post('/status/:statussId', async (req, res) => {

    if (req.session.user) {
        const statusId = req.params.friesId

        const statusFromDb = await Status.findById(statusId)

        req.body.reviewer = req.session.user.userId

        statusFromDb.reviews.push(req.body)

        await statusFromDb.save()

        res.redirect(`/status/${statusId}`)
    } else {
        res.redirect('/auth/sign-in')
    }
})


app.post("/status", async (req, res) => {
    if (req.session.user) {
        try {
            req.body.createdBy = req.session.user.userId;
            const status = await Status.create(req.body)
            status.save()
            req.session.message = "Post was made.";

            res.redirect('/status')

        } catch (error) {
            req.session.message = error.message
            res.redirect("/")
        }
    } else {
        res.redirect("auth/sign-in")
    }
})










const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
    console.log('listening on port 3000')
    console.log(`Your secret is ${process.env.SECRET_PASSWORD}`);
    // console.log(`My mongo db url is ${process.env.MONGODB_URI}`);
})