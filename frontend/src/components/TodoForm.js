import { useState } from "react"
import TaskInput from "./TaskInput"
import TitleInput from "./TitleInput"
import TodoButton from "./TodoButton"
import axios from "axios"

/**
 * @param  task - Denotes the purpose of the form (Create Todo / Update Todo).
 * @returns - Form element - Which can be used to update or create a todo.
 */
const TodoForm = ({task, buttonName, todo=""}) => {

    /**
     * title - To store the title of todo.
     * tasks - Collection of tasks (Array).
     * isImportant - To prioritize a todo.
     */

    const [title, setTitle] = useState((!todo)?"":todo.title)
    const [tasks, setTasks] = useState((!todo)?[]:todo.tasks)
    const [isImportant, setIsImportant] = useState((!todo)?false:todo.isImportant)


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
                await axios.put(`/todo/${todo._id}`, {title, tasks, isImportant})
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
        <form className="flex flex-col w-full m-auto" onSubmit={handleSubmit} onClick={(e)=>e.stopPropagation()}>
            <div className="border-2 rounded border-violet-600 p-4  bg-white">
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