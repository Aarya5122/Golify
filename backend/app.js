/**
 * Configuring dotenv package
 */
require("dotenv").config()

/**
 * Importing express package and setting it up by calling it.
 */
const express = require("express")
const app = express()

/**
 * Middlewares
 *      express.json() - To handle (parse) the json responses 
 *      express.urlencoded({extended: true}) - To handle data coming from URL in encoded format
 */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/**
 * Home route for testing purpose
 */
app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Homepage"
    })
})

/**
 * Exporting app (express setup)
 */
module.exports = app