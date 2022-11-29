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
  * UserSchema - Creating a schema for Todo
  *     - role: String value, By default holds user as value.
  *      - name: String value, Its required field, Can have maximum 50 charecters.
  *      - email: String value, Its required field, Should be unique (Creates a unique index).
  *      - profession: String value. 
  *      - appwriteId: String value, Its required field.
  *      - todos: It is a collection (Array) of ObjectId of todo.
  */
 const UserSchema = new Schema({
    role: {
        type: String,
        default: "user"
    },
     name:{
         type: String,
         required: [true, "Title of todo is required"],
         maxLength: [50, "Maximum length of name is 50 charecters"],
         trim: true
     },
     email:{
        type: String,
        required: [true, "Title of todo is required"],
        unique: true
    },
     profession:{
        type: String,
    },
    appwriteId: {
        type: String,
        required: [true, "Title of todo is required"],
    },
     todos:{
         type: [{
             type: Schema.Types.ObjectId,
             ref: "todo",
             required: [true, "Todo Id is required to store todo for user"]
         }],
     }
 }, {
    timestamps: true
 })
 
 /**
  * Exporting model
  *      - Creating a model from the Schema defined and export
  */
 module.exports = model("user", UserSchema)