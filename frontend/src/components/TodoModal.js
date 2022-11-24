import axios from "axios"
import { useEffect, useState } from "react"

/**
 * 
 * @param popup - To make rendering desicion (State). 
 * @param todo - Todo object. To populate tasks. 
 * @returns 
 */
const TodoModal = ({popup, todoId, makeRequest}) => {

    /**
     * To maintain concurrency in tasks of todo. (When we have a unsuccessful update)
     */
    const [tasks, setTasks] = useState([])

    const getTodoTasks = async () => {
        try {
            const response = await axios.get(`/todo/${todoId}`)
            setTasks([...response.data.todo.tasks])
        } catch (error) {
            console.log("Error in fetching todo in Todo modal");
            console.log("Error: ", error);
        }
    }

    useEffect(()=>{ 
        getTodoTasks()
    }, [makeRequest])
    
    if(!popup) return ""
    return(
        <div
        className="
            w-[95%]
            border-2 
            hover:border-violet-400 
            p-2 
            rounded 
            text-xl 
            text-violet-800 
            font-medium
            m-auto
            max-h-44
            overflow-auto
            mt-6
            mb-6    
        ">
            {
                (tasks.length===0)?
                <p>No Tasks Available</p>
                :
                tasks.map((task, index)=>(
                    (task)?
                    <p className="inline-block m-1 border-2 border-violet-800 rounded p-1" key={index}>{task}</p>
                    :
                    ""
                ))
            }
        </div>
    )
}

export default TodoModal