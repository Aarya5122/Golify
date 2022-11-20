/**
 * Importing mongoose package
 */
const mongoose = require("mongoose")

/**
 *  Destructuring MONGO_URL from .env file
 */
const { MONGODB_URL } = process.env

/**
 * Exporting 
 * dbConnect - Database connection
 *      - on successfull connection logs the success message and hostname
 *      - on connection failure logs the failure message, error object and exits the process
 */
exports.dbConnect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn)=>{
        console.log("Database connected successfully...")
        console.log(`Host name ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log("Database connection failed!")
        console.log(`DB connection Error: ${error}`)
        process.exit(1)
    })
}