// images
import bin from "../assets/icons/delete.png"

/**
 * 
 * @param body - Task Body.
 * @param tasks - Array (State).
 * @param setTasks - function (Update State). To handle delete task operation
 * @returns Task Element.
 */
const Task = ({body, tasks, setTasks}) => {

    /**
     * deleteTask() - It deletes the task from tasks array.
     *              - Finds the task index and splices the array.
     *              - Sets the updated array object to tasks.
     */
    const deleteTask = () => {
        const array = tasks
        const index = array.indexOf(body)
        array.splice(index, 1);
        setTasks([...array])
    }
    
    return(
        <div className="inline-block m-2 flex max-w-[91%]">
            <p 
            className="
                p-1 
                max-w-[80%]
                md:max-w-[90%]
                break-words
                border 
                border-t-violet-500 
                border-b-violet-500 
                border-l-violet-500 
                border-r-transparent 
                rounded-l 
                p-0.5 
                bg-violet-100
            ">
                {body}
            </p>
            <button 
            className="border border-red-500 rounded-r p-0.5 active:bg-red-200 pl-2 pr-1"
            onClick={deleteTask}
            type="button"
            >
                <img className="inline-block mb-1" src={bin} alt="Delete icon" width="16"/>
            </button>
        </div>
    )
}

export default Task