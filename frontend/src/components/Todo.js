import {useContext, useState} from "react"
import bin from "../assets/icons/delete.png"
import edit from "../assets/icons/edit.png"
import star from "../assets/icons/star.png"
import starFill from "../assets/icons/star-fill.png"
import axios from "axios"
import TodoModal from "./TodoModal"
import EditTodo from "./EditTodo"
import userContext from "../context/userContext"

/**
 * @param todo - Todo Object to populate values.
 * @returns A Todo element.
 */
const Todo = ({todo, makeRequest, setMakeRequest}) => {

    const {user} = useContext(userContext)

    /**
     * Used to display Todo Modal (tasks) when todo title is clicked
     */
    const [popup, setPopup] = useState(false);

    /**
     * Used to display EditForm Modal when todo edit button is clicked
     */
    const [editTodo, setEditTodo] = useState(false);

    /**
     * @param todoId - ._id value of a todo .
     * handleDelete() - Asynchronous Function (Server Request).
     *                - Deletes todo based in database based on id value of todo.
     */
    const handleDelete = async (event, todoId) => {
        try{
            event.preventDefault()
            await axios.delete(`/todo/${user.$id}/${todoId}`)
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while deleting a todo in handleDelete method")
            console.log("Error: ", error)
        }
    }

    const handleHightlight = async (event, todo) => {
        try{
            event.preventDefault()
            let {_id, isImportant} = todo
            isImportant = !isImportant
            await axios.put(`/todo/${user.$id}/${_id}`, {isImportant})
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while deleting a todo in handleDelete method")
            console.log("Error: ", error)
        }
    }

    return(
        <>
            <div className="flex my-2 justify-center">
                <button 
                className="
                    p-2
                    border-2 
                    border-violet-800 
                    rounded 
                    active:bg-violet-100 mx-3
                "
                onClick={(e)=>handleHightlight(e, todo)}
                >
                    <img src={(todo.isImportant)?starFill:star} alt="Star Todo"/>
                </button>
                <p className="
                    w-5/6 
                    border-2 
                    hover:border-violet-400 
                    p-1
                    md:p-2 
                    rounded
                    text-[14px]
                    sm:text-[16px]
                    md:text-lg 
                    lg:text-xl 
                    bg-gray-100 
                    hover:bg-violet-200 
                    text-violet-800 
                    font-medium
                    break-all
                "
                onClick={()=>setPopup(!popup)}
                >
                    {todo.title}</p>
                <button 
                className="p-2 border-2 border-blue-700 rounded active:bg-blue-200 mx-3"
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                    document.body.style.overflow = "hidden"
                    setEditTodo(true)
                }}
                >
                    <img src={edit} alt="Edit Todo"/>
                </button>
                <button 
                className="p-2 border-2 border-red-500 rounded active:bg-red-200"
                onClick={(event)=>handleDelete(event, todo._id)}
                >
                    <img src={bin} alt="Delete Todo" className="w-6" />
                </button>
            </div>

            <TodoModal popup={popup} todoId={todo._id} makeRequest={makeRequest}/>

            <EditTodo editTodo={editTodo} setEditTodo={setEditTodo} todo={todo} makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
            
        </>
    )
}

export default Todo