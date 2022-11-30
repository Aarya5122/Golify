/**
 * Importing mongoose
 */
const mongoose = require("mongoose")

/**
 * Destructuring from mongoose
 *      - Schema Constructor
 *      - model method
 */
const { Schema, model } = mongoose

/**
 * TodoSchema - Creating a schema for Todo
 *      - title: String value, Its required field, Can have maximum 30 charecters.
 *      - tasks: It is a collection (Array) of string values, Any value passed is converted to string.
 *      - isImportant: It is a flag use to prioritize todo, Stores boolean value, By default its false.
 */
const TodoSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title of todo is required"],
        maxLength: [30, "Maximum length of title is 30 charecters"]
    }, 
    tasks:{
        type: [{
            type: String
        }],
    },
    isImportant:{
        type: Boolean,
        default: false
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User Id is required to create a todo"]
    }
}, {
    timestamps: true
 })

/**
 * Exporting model
 *      - Creating a model from the Schema defined and export
 */
module.exports = model("todo", TodoSchema)