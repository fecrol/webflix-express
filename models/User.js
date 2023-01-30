const util = require("util")

class User {

    #dbConn
    #query
    #id
    #firstName
    #lastName
    #email
    #password

    constructor({dbConn, id, firstName, lastName, email, password}) {
        this.#dbConn = dbConn
        this.#query = util.promisify(this.#dbConn.query).bind(this.#dbConn)

        this.#id = id
        this.#firstName = firstName
        this.#lastName = lastName
        this.#email = email
        this.#password = password
    }

    set({id, firstName, lastName, email, password}) {
        this.#id = id
        this.#firstName = firstName
        this.#lastName = lastName
        this.#email = email
        this.#password = password
    }
    
    async readAll() {

        const query = "SELECT id, firstName, lastName, email FROM users;"
        
        try {
            const results = await this.#query(query)
            return results.length === 0 ? {message: "no results found"} : results
        }
        catch(err) {
            return {error: err}
        }
    }

    async readById(id) {

        const query = `SELECT id, firstName, lastName, email FROM users WHERE id = "${id}";`

        try {
            const result = await this.#query(query)
            return result.length === 1 ? result[0] : result.length === 0 ? {message: "no results found"} : result
        }
        catch(err) {
            return {error: err}
        }
    }

    async readByEmail(email) {

        const query = `SELECT id, firstName, lastName, email FROM users WHERE email = "${email}";`

        try {
            const result = await this.#query(query)
            return result.length === 1 ? result[0] : result.length === 0 ? {message: "no results found"} : result
        }
        catch(err) {
            return {error: err}
        }
    }

    async create() {
        
        try {
            await this.#query(
                `INSERT INTO users (id, firstName, lastName, email, password)
                VALUES ("${this.#id}", "${this.#firstName}", "${this.#lastName}", "${this.#email}", "${this.#password}");`
            )

            return await this.readById(this.#id)
        }
        catch(err) {
            return {error: err}
        }
    }
}

module.exports = User
