import TodoForm from "./TodoForm"

const EditTodo = ({todo, editTodo, setEditTodo}) => {


    if(!editTodo) return ""
    return(
        <div 
        className={`w-full h-screen absolute top-0 left-0 `}
        style={{background: "rgba(0, 0, 0, 0.8)"}}
        onClick={()=>{
            setEditTodo(false)
            document.body.style.overflow = "auto"
        }}
        >
            <div className="w-2/3 flex flex-col m-auto relative top-1/4">
                    <button 
                    className="py-2 px-4 bg-white bg-red-600 font-bold text-xl text-white rounded"
                    onClick={()=>{
                        setEditTodo(false)
                        document.body.style.overflow = "auto"
                        console.log(document.body.style.overflow)
                    }}
                    >Cancel</button>
                <TodoForm task="update" buttonName="Update Todo" todo={todo}/>
            </div>
        </div>
    )
}

export default EditTodo