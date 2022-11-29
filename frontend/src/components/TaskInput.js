import {useState} from "react"

// components
import Task from "./Task"

/**
 * 
 * @param tasks - Array (State).
 * @param setTasks - Function (Update State).  To handle add task operation
 * @returns Task Collection and Task Input Element.
 */

const TaskInput = ({tasks, setTasks}) => {

    /**
     * Used to update the task input value when input changes.
     */
    const [task, setTask] = useState("")

    /**
     * addTask() - Add the new task to tasks array.
     */
    function addTask(e){
        e.preventDefault()
        if(task)
        setTasks([...tasks, task])
        setTask("")
    }

     /**
     * handleChange() - Updates the task value.
     */
    function handleChange(e){
        setTask(e.target.value)
    }
    
    return(
        <>
            <div className="h-24 md:h-48 border-2 rounded mb-4 py-1 md:py-2">
                <div className="mb-6 min-h-fit max-h-20 md:max-h-44 overflow-auto flex flex-wrap">
                    {
                        (tasks.length === 0)?
                        <h1 className="  
                            text-[24px]
                            sm:text-[30px]
                            md:text-[42px]
                            font-bold
                            text-violet-400
                            pl-6
                        ">Add your tasks below</h1>
                        :
                        tasks.map((task, index)=>(<Task body={task} tasks={tasks} setTasks={setTasks} key={index}/>))
                    }
                </div>
            </div>
            <div className="w-1/2 inline">
                <label htmlFor="taskInput">
                    <input
                    className="
                        pb-1 
                        pl-2 
                        border-t-0
                        border-l-0
                        border-r-0
                        border-b-2
                        border-violet-400
                        focus:border-violet-800 
                        focus:outline-none 
                        text-md
                        md:text-lg
                        w-full 
                        sm:w-[70%]
                        lg:w-[60%] 
                        xl:w-2/3
                        placeholder-violet-600
                        focus:ring-0
                    " 

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
                className="
                    bg-violet-600 
                    mt-2
                    md:mt-0
                    sm:ml-2 
                    px-5 
                    py-2
                    text-md 
                    lg:text-lg  
                    text-white 
                    font-medium 
                    rounded 
                    active:bg-violet-400 
                    active:text-gray-500
                ">Add Task</button>               
            </div>
        </>
    )
}

export default TaskInput