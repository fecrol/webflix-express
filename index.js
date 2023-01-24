const express = require("express")
if(process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./.env" })
const app = express()
const PORT = process.env.PORT
const loginRoute = require("./routes/login")
const registerRoute = require("./routes/register")
const moviesRoute = require("./routes/movies")

app.set("view engine", "ejs")

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/movies", moviesRoute)

app.get("/", (req, res) => {
    res.status(200)
    res.render("home")
})

app.listen(PORT, () => {
    console.log(`Currently listening on port ${PORT}`)
})
