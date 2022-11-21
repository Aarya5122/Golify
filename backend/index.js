/**
 * Importing the express setup
 */
const app = require("./app")

/**
 * dbConnect() - Database Connection
 *      - Connecting application to database
 */
const { dbConnect } = require("./config/dbConnect")
dbConnect()

/**
 * Destructuring PORT from .env file
 */
const { PORT } = process.env


/**
 * Setting up server to listen at PORT. 
 * If PORT is not available it uses 4001 as PORT
 */
app.listen(PORT||4001, ()=>{
    console.log("Server is up and running in PORT", PORT||4001)
})