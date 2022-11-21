/**
 * Importing Express to instantiated a rotuer to define routes .
 */
const express = require("express")
const router = express.Router()

/**
 * Importing controllers from todoController.
 */
const { createTodo, getTodos, editTodo, getTodo, deleteTodo } = require("../controllers/TodoController")

/**
 * "/create" - route is used to create a todo. It uses post method.
 */
router.route("/create").post(createTodo)

/**
 * "/getALl" - route is used to fetch all todos. It uses get method.
 */
router.route("/getAll").get(getTodos)

/**
 * "/:todoId" - route expects a parameter which will be used to fetch, update and delete todo on same route.
 *            - uses get() to fetch todo
 *            - uses put() to update todo
 *            - uses delete() to delete todo
 */ 
router
    .route("/:todoId")
    .get(getTodo)
    .put(editTodo)
    .delete(deleteTodo)

/**
 * Exporting the router
 */
module.exports = router