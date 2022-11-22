import {useState} from "react"
import Task from "./Task"

const TaskInput = ({tasks, setTasks}) => {

    const [task, setTask] = useState("")

    function addTask(e){
        e.preventDefault()
        console.log(e.target)
        console.log("ADDED task")
        // setTasks([...tasks, task])
    }

    function handleChange(e){
        setTask(e.target.value)
    }

    return(
        <>
            <div className="h-48 border rounded mb-4 py-2">
                <div className="taskListContainer mb-6 min-h-fit max-h-44 overflow-auto flex flex-wrap">
                    <Task/>
                </div>
            </div>
            <div className="w-1/2 inline">
                <label htmlFor="taskInput">
                    <input
                    className="pb-1 pl-2 border-b-2 border-gray-200 text-lg focus:outline-none focus:border-b-2 focus:border-violet-500 w-3/4" 
                    type="text" 
                    id="taskInput" 
                    name="taskInput" 
                    placeholder="Enter your task"
                    value={task}
                    onChange={handleChange}
                    onKeyPress={e => {
                        if (e.key !== 'Enter') return;
                        addTask(e)
                    }} 
                    />
                </label>
                <button 
                onClick={addTask}
                className="bg-violet-500 ml-2 px-6 py-2 text-white font-medium rounded active:bg-violet-400 active:text-gray-500"
                >Add Task</button>               
            </div>
        </>
    )
}

export default TaskInput