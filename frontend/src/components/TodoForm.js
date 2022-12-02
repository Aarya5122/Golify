import { useContext, useState } from "react"

// axios
import axios from "axios"

// context
import userContext from "../context/userContext"

// components
import TaskInput from "./TaskInput"
import TitleInput from "./TitleInput"
import TodoButton from "./TodoButton"

/**
 * @param  task - Denotes the purpose of the form (create Todo / update Todo).
 * @param  buttonName - Denotes the name of submitting button (Create Todo / Update Todo).
 * @param  todo - used to populate inital values if todo is passed.
 * @param  setMakeRequest - To make DB call and populate todos in todoList once form is submitted.
 * @returns - Form element - Which can be used to update or create a todo.
 */
const TodoForm = ({task, buttonName, todo="", makeRequest, setMakeRequest, setEditTodo}) => {

    /**
     * It is used to pass appwrite Id in DB request parmas
     */
    const {user} = useContext(userContext)

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
     *                - Finally resets the values of all the inputfield and updates makeRequest state
     */
    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            if(task === "create"){
                await axios.post(`/todo/create`, {title, tasks, isImportant, userId:user.$id})
            } else {
                await axios.put(`/todo/${user.$id}/${todo._id}`, {title, tasks, isImportant})
                setEditTodo(false)
                document.body.style.overflow = "auto"
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
            setMakeRequest(!makeRequest)
        }
    }

    /**
     * Inverses the value of isImportant State
     */
    const handleHighlightTodo = () => {
        setIsImportant(!isImportant)
    }

    return(
        <form className="flex flex-col w-[95%] sm:w-5/6 md:w-full m-auto bg-white" onSubmit={handleSubmit} onClick={(e)=>e.stopPropagation()}>
            <div className="border-2 rounded border-violet-600 p-3 m-4 md:p-4 md:m-6 lg:m-0">
                <div className='w-full flex flex-col lg:flex-row p-0 lg:p-2 mb-4 lg:mb-0'>
                    <div className="w-full lg:w-1/2">
                        <TitleInput title={title} setTitle={setTitle}/>
                        <label htmlFor="isImportant" 
                        className="
                            block 
                            mt-10
                            text-lg 
                            md:text-xl 
                            text-violet-800 
                            font-medium
                        ">
                            <input
                            className="
                                p-3 
                                -mt-1 
                                focus:ring-0 
                                border-2 
                                border-violet-800 
                                text-violet-800
                            " 
                            type="checkbox" 
                            name="isImportant" 
                            id="isImportant" 
                            checked={isImportant}
                            value={isImportant} 
                            onChange={handleHighlightTodo}
                            /> Highlight Todo
                        </label>
                    </div>
                    <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                       <TaskInput tasks={tasks} setTasks={setTasks}/>
                    </div>
                </div>
                <TodoButton name={buttonName}/>
            </div>
        </form>
        
    )
}

export default TodoForm