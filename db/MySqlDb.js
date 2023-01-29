const mysql = require("mysql")
if(process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./.env" })

class MySqlDb {

    connect() {
        return this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MY_SQL_USER,
            password: process.env.MY_SQL_ROOT_PASSWORD,
            database: process.env.MY_SQL_DATABASE
        })
    }
}

const db = new MySqlDb()
module.exports = db