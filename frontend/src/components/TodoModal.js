const TodoModal = ({popup, todo}) => {
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
            bg-gray-100 
            text-violet-800 
            font-medium
            m-auto
            max-h-44
            overflow-auto
        ">
            {
                (todo.tasks.length===0)?
                <p>No Tasks Available</p>
                :
                todo.tasks.map((task, index)=>(
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