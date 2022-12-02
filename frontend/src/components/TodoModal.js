import { useContext, useEffect, useState } from "react"

// axios
import axios from "axios"

// context
import userContext from "../context/userContext"

/**
 * 
 * @param popup - To make rendering desicion (State). 
 * @param todoId - TodoID is used to populate tasks by fetching them from DB. 
 * @param makeRequest - State use to run the fetch tasks when todos are added deleted or updated in DB. 
 * @param created - It is used to populate the todo created date and time. 
 * @param updated - It is used to populate the todo updated date and time.
 * @returns 
 */
const TodoModal = ({popup, todoId, makeRequest, created, updated}) => {

    /**
     * It is used to pass appwrite Id in DB request parmas
     */
    const {user} = useContext(userContext)

    /**
     * To maintain concurrency in tasks of todo. (When we have a unsuccessful update)
     */
    const [tasks, setTasks] = useState({})

    /**
     * getTodoTasks() - Asynchronous Function
     *      - Fetches all the tasks of user's todo
     */
    const getTodoTasks = async () => {
        try {
            const response = await axios.get(`/todo/${user.$id}/${todoId}`)
            if(response.data.todo.tasks)
            setTasks(response.data.todo.tasks)
        } catch (error) {
            console.log("Error in fetching tasks in Todo modal");
            console.log("Error: ", error);
        }
    }

    
    useEffect(()=>{ 
        getTodoTasks()
    }, [makeRequest])
    
    /**
     * Conditional rendering: Check if param pop is true and display tasks else display "".
     */
    if(!popup) return ""
    return(
        <div
        className="
            w-[95%]
            border-2 
            hover:border-violet-400 
            p-2 
            rounded
            text-sm
            sm:text-md
            md:text-lg
            xl:text-xl 
            text-violet-800 
            font-medium
            m-auto
            max-h-24
            md:max-h-44
            overflow-auto
            my-4  
        ">
            <div>
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
            <div className="flex justify-between text-base mt-4">
                <p>Created: {new Date(created).toLocaleString("en-GB", {timeZone: 'Asia/Kolkata'})}</p>
                <p>Updated: {new Date(updated).toLocaleString("en-GB", {timeZone: 'Asia/Kolkata'})}</p>
                
            </div>
        </div>
    )
}

export default TodoModal