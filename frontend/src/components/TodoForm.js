import { useState } from "react"
import TaskInput from "./TaskInput"
import TitleInput from "./TitleInput"
import TodoButton from "./TodoButton"
import axios from "axios"

const TodoForm = ({task, buttonName}) => {

    const [title, setTitle] = useState("")
    const [tasks, setTasks] = useState([])
    const [isImportant, setIsImportant] = useState(false)

    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            if(task === "create"){
                await axios.post("/todo/create", {title, tasks, isImportant})
            } else {
                //FIXME:
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

    return(
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-2/3 m-auto border rounded border-violet-400 p-4  bg-white">
                <div className='w-full flex p-2'>
                    <div className="w-1/2">
                        <TitleInput title={title} setTitle={setTitle}/>
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