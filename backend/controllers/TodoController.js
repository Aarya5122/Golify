/**
 * Importing the todo model to perform CRUD operations
 */
const Todo = require("../models/TodoSchema")

/**
 * createTodo() - Asynchronous Function
 *      - Destructures the input received in req.body.
 *      - Create a todoObj object.
 *      - Validated if title is received.
 *      - Validated if title received is of type string.
 *      - define title property in todoObj.
 *      - Validated if tasks are received then it should be of type array.
 *      - If tasks is valid define it in todoObj.
 *      - Validated if isImportant is of type boolean.
 *      - If isImportant is valid define it in todoObj.
 *      - Creates a new document from the validated data. (Asynchronous operation - create())
 */
exports.createTodo = async (req, res) => {
    try{
        const {title, tasks, isImportant} = req.body

        console.log("Todo Object: ",title, tasks, isImportant)

        const todoObj = {}

        if(!title){
            throw new Error("Title required, Please pass title to create a todo")
        }

        if(typeof title !== "string"){
            throw new Error("Title should have a string value")
        }

        Object.defineProperty(todoObj, "title", {
            value: title,
            enumerable: true 
        })

        console.log(todoObj)

        if(tasks && !(Array.isArray(tasks))){
            throw new Error("Tasks should be a array object")
        }

        if(tasks){
            Object.defineProperty(todoObj, "tasks", {
                value: tasks,
                enumerable: true 
            })
        }

        if(isImportant && typeof isImportant !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isImportant===true || isImportant===false){
            Object.defineProperty(todoObj, "isImportant", {
                value: isImportant,
                enumerable: true 
            })
        }

        const todo = await Todo.create(todoObj)

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo
        })
    } catch(error){
        console.log("Error in create todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in create todo controller",
            error
        })

    }
}

/**
 * getTodos() - Asynchronous Function
 *      - Fetches all the todos from database (Asynchronous operation - find())
 */
exports.getTodos = async (req, res) => {
    try{
        const todos = await Todo.find({})

        res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            todos
        })

    } catch(error){
        console.log("Error in get todos controller")
        console.log("ERROR: ", error)
        res.status(500).json({
            success: false,
            messageSrc: "Error in get todos controller",
            error
        })
    }
}

/**
 * getTodo() - Asynchronous Function
 *      - Destructures the input received in req.params.
 *      - Validated if todoId is received.
 *      - Validated if todoId received is of type string.
 *      - Fetches the todo with respect to todoId. (Asynchronous operation - findById())
 */
exports.getTodo = async (req, res) => {
    try{
        const { todoId } = req.params

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const todo = await Todo.findById(todoId)

        res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            todo
        })
    } catch(error){
        console.log("Error in get todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in get todo controller",
            error
        })
    }
}

/**
 * editTodo() - Asynchronous Function
 *      - Destructures the input received in req.params.
 *      - Validated if todoId is received.
 *      - Validated if todoId received is of type string.
 *      - Destructures the input received in req.body.
 *      - Create a todoObj object.
 *      - Validated if title has been received and is of type string.
 *      - If title is valid define it in todoObj.
 *      - Validated if tasks are received then it should be of type array.
 *      - If tasks is valid define it in todoObj.
 *      - Validated if isImportant is received and is of type boolean.
 *      - If isImportant is valid define it in todoObj.
 *      - Updates the todo with respect to the todoId and todoObj. (Asynchronous operation - findByIdAndUpdate())
 */
exports.editTodo = async (req, res) => {
    try{
        const { todoId } = req.params

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const {title, tasks, isImportant} = req.body

        const todoObj = {}

        if(title && typeof title !== "string"){
            throw new Error("Iitle should have a string value")
        }

        if(title){
            Object.defineProperty(todoObj, "title", {
                value: title,
                enumerable: true 
            })
        }

        if(tasks && !(Array.isArray(tasks))){
            throw new Error("Tasks should be a array object")
        }

        if(tasks){
            Object.defineProperty(todoObj, "tasks", {
                value: tasks,
                enumerable: true 
            })
        }

        if(isImportant && typeof isImportant !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isImportant===true||isImportant===false){
            Object.defineProperty(todoObj, "isImportant", {
                value: isImportant,
                enumerable: true 
            })
        }

        const todo = await Todo.findByIdAndUpdate(todoId, todoObj)

        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            targetedTodo: todo
        })
    } catch(error){
        console.log("Error in edit todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in edit todo controller",
            error
        })
    }
}

/**
 * deleteTodo() - Asynchronous Function
 *      - Destructures the input received in req.params.
 *      - Validated if todoId is received.
 *      - Validated if todoId received is of type string.
 *      - Deletes the todo with respect to todoId. (Asynchronous operation - findByIdAndDelete())
 */
 exports.deleteTodo = async (req, res) => {
    try{
        const { todoId } = req.params

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const todo = await Todo.findByIdAndDelete(todoId)

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            deleteTodo: todo
        })
    } catch(error){
        console.log("Error in delete todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in delete todo controller",
            error
        })
    }
}