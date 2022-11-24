import { useState, useEffect } from "react"
import Todo from "./Todo"
import axios from "axios"

/**
 * @returns Collection of todos received from server request.
 */
const TodoList = () => {

    /**
     * To store the todos received from a server request.
     */
    const [todos, setTodos] = useState([])
    
    /**
     * getTodos() - Asynchronous Function
     *            - Fetches all the todos stored in database by making a server request.
     */
    const getTodos = async () => {
        try{
            const response = await axios.get("/todo/getAll")
            const {data} = response
            data.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.todos])
        } catch(error){
            console.log("Error while fetching todos in getTodos method")
            console.log("Error: ", error)
        }
    }

    useEffect(()=>{
        getTodos()
    }, [])

    return(
        <div className="border w-2/3 mx-auto mb-12 pr-2 pb-1 rounded">
            {
                todos.map((todo)=>(
                    <Todo todo={todo} key={todo._id}/>
                ))
            }
        </div>
    )
}

export default TodoList