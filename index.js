const express = require("express")
if(process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./.env" })
const loginRoute = require("./routes/login")
const registerRoute = require("./routes/register")
const moviesRoute = require("./routes/movies")
const db = require("./db/MySqlDb")
const User = require("./models/User")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))

app.set("view engine", "ejs")

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/movies", moviesRoute)

app.get("/", async (req, res) => {
    const dbConn = db.connect()

    const user = new User({dbConn})
    let results = await user.readAll()
    results = results.length === 0 ? {message: "no results found"} : results

    dbConn.end()

    results.error ? res.status(500).json(results) : res.status(200).json(results)
})

app.listen(PORT, () => {
    console.log(`Currently listening on port ${PORT}`)
})
