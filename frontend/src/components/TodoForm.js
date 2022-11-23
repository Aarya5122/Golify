import { useState } from "react"
import TaskInput from "./TaskInput"
import TitleInput from "./TitleInput"
import TodoButton from "./TodoButton"
import axios from "axios"

/**
 * @param  task - Denotes the purpose of the form (Create Todo / Update Todo).
 * @returns - Form element - Which can be used to update or create a todo.
 */
const TodoForm = ({task, buttonName}) => {

    /**
     * title - To store the title of todo.
     * tasks - Collection of tasks (Array).
     * isImportant - To prioritize a todo.
     */

    const [title, setTitle] = useState("")
    const [tasks, setTasks] = useState([])
    const [isImportant, setIsImportant] = useState(false)

    /**
     * handleSubmit() - Asynchronous Function
     *                - Used to make server request based on task of the form
     */
    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            if(task === "create"){
                await axios.post("/todo/create", {title, tasks, isImportant})
            } else {
                //FIXME: handle updation request - URL Error
                await axios.put("/todo/${id}", {title, tasks, isImportant})
            }
        } catch(error){
            if(task === "create"){
                console.log("Error while creating a new todo in todoForm handleSubmit");
            } else {
                console.log("Error whileupdating a todo in todoForm handleSubmit");
            }
            console.log("Error", error)
        } finally{
            setTitle("")
            setTasks([])
            setIsImportant(false)
        }
    }

    const handleHighlightTodo = () => {
        setIsImportant(!isImportant)
    }

    return(
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-2/3 m-auto border rounded border-violet-400 p-4  bg-white">
                <div className='w-full flex p-2'>
                    <div className="w-1/2">
                        <TitleInput title={title} setTitle={setTitle}/>
                        <label htmlFor="isImportant" 
                        className="block mt-10 text-xl text-violet-800 font-medium">
                            <input
                            className="p-3 -mt-1 focus:ring-0 border-2 border-violet-800 text-violet-800" 
                            type="checkbox" 
                            name="isImportant" 
                            id="isImportant" 
                            checked={isImportant}
                            value={isImportant} 
                            onChange={handleHighlightTodo}
                            /> Highlight Todo
                        </label>
                    </div>
                    <div className="w-1/2">
                       <TaskInput tasks={tasks} setTasks={setTasks}/>
                    </div>
                </div>
                <TodoButton name={buttonName}/>
            </div>
        </form>
        
    )
}

export default TodoForm