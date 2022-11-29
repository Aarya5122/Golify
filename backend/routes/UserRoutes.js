/**
 * Importing Express to instantiated a rotuer to define routes .
 */
 const express = require("express")
 const router = express.Router()
 
 /**
  * Importing controllers from user controllers.
  */
 const { createUser } = require("../controllers/user/CreateUser")
 const { getUserTodos } = require("../controllers/user/getUserTodos")
 
 /**
  * "/create" - route is used to create a user. It uses post method.
  */
 router.route("/create").post(createUser)

  /**
  * "/todos" - route is used to fetch a user with todos populated.
  */
 router.route("/todos").get(getUserTodos)
 
 /**
  * Exporting the router
  */
 module.exports = router