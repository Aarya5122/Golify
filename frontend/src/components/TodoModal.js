import { useState } from "react"

const TodoModal = ({popup, todo}) => {

    const [validTasks] = useState([...todo.tasks])
    
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
                (validTasks.length===0)?
                <p>No Tasks Available</p>
                :
                validTasks.map((task, index)=>(
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