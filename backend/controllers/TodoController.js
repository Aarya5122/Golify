/**
 * Importing the todo model to perform CRUD operations
 */
const Todo = require("../models/TodoSchema")
const User = require("../models/UserSchema")

/**
 * createTodo() - Asynchronous Function
 *      - Destructures the input received in req.body.
 *      - Destructures the userid/appwriteId received in req.params.
 *      - Create a todoObj object.
 *      - Validated if title is received.
 *      - Validated if title received is of type string.
 *      - define title property in todoObj.
 *      - Validated if tasks are received then it should be of type array.
 *      - If tasks is valid define it in todoObj.
 *      - Validated if isImportant is of type boolean.
 *      - If isImportant is valid define it in todoObj.
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string.
 *      - Fetch the user in DB using appwriteId
 *      - Validate user exists
 *      - After finding user add his user._id as property in todoObj.
 *      - Creates a new todo document from the validated data. (Asynchronous operation - create())
 *      - Update user todos using the todo._id and save.
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
        
        if(!userId){
            throw new Error("User Id required, Please pass User Id  to create a todo")
        }

        if(typeof userId !== "string"){
            throw new Error("User Id should have a string value")
        }

        const user = await User.find({appwriteId: userId})

        if(!user[0]){
            throw new Error("User not found in DB")
        }

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

        user[0].save()

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
            user: user[0]
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
 * getTodos() - Asynchronous Function - ***ADMIN ROUTE***
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
 *      - Fetches the user with respect to userId/appwriteId. (Asynchronous operation - find())
 *      - validate if user and todo exist 
 *      - validate the ownership of user and todo
 */
exports.getTodo = async (req, res) => {
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

        const todo = await Todo.findById(todoId)
        const user = await User.findOne({appwriteId: userId})

        if(!todo){
            throw new Error("Todo not found in DB")
        }

        if(!user){
            throw new Error("User not found in DB")
        }

        if(todo.user.equals(user._id)===false){
            throw new Error("User is not the owner of the todo")
        }

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
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string. 
 *      - Fetch the todo using todoID - (Asynchronous operation - findByID())
 *      - Fetch the user using userId/appwriteId - (Asynchronous operation - find())
 *      - Validate todo exists 
 *      - Validate user exists
 *      - Validate if todo belongs to user
 *      - Destructures the input received in req.body.
 *      - Validated if title has been received and is of type string.
 *      - If title is valid update in todo fetched.
 *      - Validated if tasks are received then it should be of type array.
 *      - If tasks is valid update in todo fetched.
 *      - Validated if isImportant is received and is of type boolean.
 *      - If isImportant is valid update in todo fetched.
 *      - Validated if isCompleted is received and is of type boolean.
 *      - If isCompleted is valid update in todo fetched.
 *      - Save the changes made to todo - (Asynchronous operation - save())
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

        const todo = await Todo.findById(todoId.trim())

        const user = await User.find({appwriteId: userId.trim()})

        if(!todo){
            throw new Error("Todo not found in DB")
        }

        if(!user[0]){
            throw new Error("User not found in DB")
        }

        if(todo.user.equals((user[0]._id))===false){
            throw new Error("User is not the owner of todo")
        }

        const {title, tasks, isImportant, isCompleted} = req.body

        if(title && typeof title !== "string"){
            throw new Error("Iitle should have a string value")
        }

        if(title){
            todo.title = title
        }

        if(tasks && !(Array.isArray(tasks))){
            throw new Error("Tasks should be a array object")
        }

        if(tasks){
           todo.tasks = tasks
        }

        if(isImportant && typeof isImportant !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isImportant===true||isImportant===false){
           todo.isImportant = isImportant
        }

        if(isCompleted && typeof isCompleted !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isCompleted===true||isCompleted===false){
           todo.isCompleted = isCompleted
        }

        await todo.save()

        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            todo
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
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string. 
 *      - Validated if todoId is received.
 *      - Validated if todoId received is of type string.
 *      - Fetch the todo using todoID - (Asynchronous operation - findByIDAndDelete())
 *      - Fetch the user using userId/appwriteId - (Asynchronous operation - find())
 *      - Validate todo exists 
 *      - Validate user exists
 *      - Filter the user todos collection. Filter all the todos which was not deleted and store it to user todos
 *      - Save the user (Asynchronous operation - save())
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

        if(!todo){
            throw new Error("Todo not found in DB")
        }

        if(!user[0]){
            throw new Error("User not found in DB")
        }

        user[0].todos = user[0].todos.filter((todoObj)=>(todoObj.equals(todo._id)===false))

        await user[0].save()

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
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string. 
 *      - Validated if search is received.
 *      - Validated if search received is of type string.
 *      - Fetch the user using userId/appwriteId - (Asynchronous operation - find())
 *      - Validate if user exists in DB
 *      - Finds the todos and tasks which include the search value using regex and $or operation.
 *      - Validate if todos and tasks returned falsy values.
 *      - Only filter the todos whose user reference matches with the user we fetched
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

        if(!user){
            throw new Error("User not found in DB")
        }

        const unfilteredTodos = await Todo.find({ $or: [{title: new RegExp(search, 'i')}, {tasks: new RegExp(search, 'i')}] })
        
        if(!unfilteredTodos){
            throw new Error("Searched todo or tasks retured falsy values")
        }
        
        const todos = unfilteredTodos.filter((todo)=>todo.user.equals(user[0]._id))
        res.status(200).json({
            success: true,
            todos   
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