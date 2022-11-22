import { useState, useEffect } from "react"
import Todo from "./Todo"
import axios from "axios"

const TodoList = () => {

    const [todos, setTodos] = useState([])
    
    const getTodos = async () => {
        try{
            const response = await axios.get("/todo/getAll")
            setTodos(response.data.todos)
        } catch(error){
            console.log("Error while fetching todos in getTodos method")
            console.log("Error: ", error)
        }
    }

    useEffect(()=>{
        getTodos()
    }, [])

    return(
        <div className="border w-2/3 mx-auto mb-12">
            {
                todos.map((todo)=>(
                    <Todo todo={todo} key={todo._id}/>
                ))
            }
        </div>
    )
}

export default TodoList