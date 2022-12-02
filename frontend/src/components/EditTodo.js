// components
import TodoForm from "./TodoForm"
import { useNavigate } from "react-router-dom"

/**
 * 
 * @param todo - Todo Object to fill initial values.
 * @param editTodo - To make a rendering decision (State).
 * @param setEditTodo - function (Update State).
 * @returns Todo Updation Form with values populated.
 */
const EditTodo = ({todo, editTodo, setEditTodo, makeRequest, setMakeRequest}) => {

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
            <div className="w-11/12 md:w-2/3 flex flex-col m-auto relative top-[60px] md:top-1/4">
                    <button 
                    className="w-[95%] sm:w-5/6 md:w-full mx-auto py-2 px-4 bg-white bg-red-600 font-bold text-xl text-white rounded-t"
                    >Cancel</button>
                <TodoForm task="update" buttonName="Update Todo" todo={todo} makeRequest={makeRequest} setMakeRequest={setMakeRequest} setEditTodo={setEditTodo}/>
            </div>
        </div>
    )
}

export default EditTodo