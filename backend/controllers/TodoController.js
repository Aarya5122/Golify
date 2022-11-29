/**
 * Importing the todo model to perform CRUD operations
 */
const Todo = require("../models/TodoSchema")
const User = require("../models/UserSchema")

/**
 * createTodo() - Asynchronous Function
 *      - Destructures the input received in req.body.
 *      - Destructures the userid received in req.params.
 *      - Create a todoObj object.
 *      - Validated if title is received.
 *      - Validated if title received is of type string.
 *      - define title property in todoObj.
 *      - Validated if tasks are received then it should be of type array.
 *      - If tasks is valid define it in todoObj.
 *      - Validated if isImportant is of type boolean.
 *      - If isImportant is valid define it in todoObj.
 *      - Creates a new document from the validated data. (Asynchronous operation - create())
 *      - Find the user in DB using appwriteId
 *      - Update user todos using the user._id.
 */
exports.createTodo = async (req, res) => {
    try{
        const {title, tasks, isImportant, userId} = req.body

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
        
        console.log(userId);

        if(!userId){
            throw new Error("User Id required, Please pass User Id  to create a todo")
        }

        if(typeof userId !== "string"){
            throw new Error("User Id should have a string value")
        }

        const user = await User.find({appwriteId: userId})

        Object.defineProperty(todoObj, "user", {
            value: user[0]._id,
            enumerable: true 
        })

        const todo = await Todo.create(todoObj)

        if(!user[0].todos){
            user[0].todos = [todo._id]
        } else {
            user[0].todos.push(todo._id)
        }

        const updateUser = await User.findByIdAndUpdate(user[0]._id, {
            todos: user[0].todos
        })

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
            updateUser
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
        const { todoId, userId } = req.params

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        if(!userId){
            throw new Error("User ID is required to update the todo")
        }

        if(typeof userId !== "string"){
            throw new Error("User ID should of type string")
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

        const todo = await Todo.findById(todoId.trim())

        const user = await Todo.find({appwriteId: userId.trim()})

        if(todo.user === user[0]._id){
            throw new Error("User is not the owner of todo")
        }

        const updatedTodo = await Todo.findByIdAndUpdate(todo._id, todoObj)

        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            targetedTodo: updatedTodo
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
        const { userId, todoId } = req.params

        if(!userId){
            throw new Error("User ID is required to delete the todo")
        }

        if(typeof userId !== "string"){
            throw new Error("User Id should of type string")
        }

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const todo = await Todo.findByIdAndDelete(todoId)

        const user = await User.find({appwriteId: userId})

        user[0].todos = user[0].todos.filter((todoObj)=>(todoObj.equals(todo._id)===false))

        await User.findByIdAndUpdate(user[0]._id, {todos: user[0].todos})

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

/**
 * searchTodos() - Asynchronous Function
 *      - Destructures the input received in req.query.
 *      - Validated if search is received.
 *      - Validated if search received is of type string.
 *      - Finds the todos and tasks which include the search value using regex and $or operation.
 */
exports.searchTodos = async (req, res) => {
    try{

        const { search, userId } = req.query

        if(!userId){
            throw new Error("User Id value  is required to fetch the todos")
        }

        if(typeof userId !== "string"){
            throw new Error("User Id value should be a type string")
        }

        if(!search){
            throw new Error("Search value  is required to fetch the todos")
        }

        if(typeof search !== "string"){
            throw new Error("search value should be a type string")
        }

        const user = await User.find({appwriteId: userId});
        const todos = await Todo.find({ $or: [{title: new RegExp(search, 'i')}, {tasks: new RegExp(search, 'i')}] })
        const filteredTodos = todos.filter((todo)=>todo.user.equals(user[0]._id))
        console.log("FILTERED");
        console.log(filteredTodos)
        res.status(200).json({
            success: true,
            filteredTodos   
        })
    } catch(error){
        console.log("Error in search todos controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in search todos controller",
            error
        })
    }
}