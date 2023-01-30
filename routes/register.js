const express = require("express")
const db = require("../db/MySqlDb")
const User = require("../models/User")
const crypto = require("crypto")

const route = express.Router()

route.get("/", (req, res) => {

    const error = req.query.error

    res.status(200)
    res.render("register", {error})
})

route.post("/", async (req, res) => {
    const dbConn = db.connect()

    const id =  crypto.randomUUID()
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword

    if(firstName.length === 0) return res.redirect("/register?error=first%20name%20is%20required")
    if(lastName.length === 0) return res.redirect("/register?error=last%20name%20is%20required")
    if(email.length === 0) return res.redirect("/register?error=email%20is%20required")
    if(password.length === 0) return res.redirect("/register?error=password%20is%20required")
    if(repeatPassword !== password) return res.redirect("/register?error=passwords%20do%20not%20match")

    const user = new User({dbConn, id, firstName, lastName, email, password})
    
    let result = await user.readByEmail(email)
    if(result && !result.message) return res.redirect("/register?error=user%20already%20exists")

    result = await user.create()

    dbConn.end()

    result.error ? res.redirect("/register") : res.redirect("/login")
})

module.exports = route