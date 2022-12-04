import {useContext, useState} from "react"

// axios
import axios from "axios"

// context
import userContext from "../context/userContext"

// images
import bin from "../assets/icons/delete.png"
import edit from "../assets/icons/edit.png"
import star from "../assets/icons/star.png"
import starFill from "../assets/icons/star-fill.png"
import check from "../assets/icons/red-check.png"
import checked from "../assets/icons/check.png"

//components
import TodoModal from "./TodoModal"
import EditTodo from "./EditTodo"
import DeleteModal from "./DeleteModal"

/**
 * @param todo - Todo Object to populate values.
 * @returns A Todo element.
 */
const Todo = ({todo, makeRequest, setMakeRequest}) => {

    /**
     * It is used to pass appwrite Id in DB request parmas
     */
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
     * Used to display EditForm Modal when todo edit button is clicked
     */
    const [deleteTodo, setDeleteTodo] = useState(false);

    /**
     * @param todo - stores todo object which has to update its isImportant field
     * handleHighlight() - Prevent default behaviour of form submission (reloading).
     *                   - Destructure id and isImportant field from todo
     *                   - Inverse the value of isImportant
     *                   - Make PUT request to database to update todo value.
     *                   - Updates makeRequest state
     */
    const handleHightlight = async (event, todo) => {
        try{
            event.preventDefault()
            let {_id, isImportant} = todo
            isImportant = !isImportant
            await axios.put(`/todo/${user.$id}/${_id}`, {isImportant})
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while updating a todo in handleHightlight method")
            console.log("Error: ", error)
        }
    }

    
    /**
     * @param todo - stores todo object which has to update its isImportant field
     * handleCompleted() - Prevent default behaviour of form submission (reloading).
     *                   - Destructure id and isCompleted field from todo
     *                   - Inverse the value of isCompleted
     *                   - Make PUT request to database to update todo value.
     *                   - Updates makeRequest state
     */
    const handleCompleted = async (event, todo) => {
        try{
            event.preventDefault()
            let {_id, isCompleted} = todo
            isCompleted = !isCompleted
            await axios.put(`/todo/${user.$id}/${_id}`, {isCompleted})
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while updating a todo in handleCompleted method")
            console.log("Error: ", error)
        }
    }

    return(
        <>
            <div className="flex my-2 justify-center">
                <button 
                className={`
                    p-2
                    border-2 
                    border-violet-800
                    rounded 
                    active:bg-violet-100 
                    mx-3
                `}
                onClick={(e)=>handleHightlight(e, todo)}
                >
                    <img src={(todo.isImportant)?starFill:star} alt="Star Todo"/>
                </button>
                <p className={`
                    w-5/6 
                    border-2 
                    p-1
                    md:p-2 
                    rounded
                    text-[14px]
                    sm:text-[16px]
                    md:text-lg 
                    lg:text-xl 
                    font-medium
                    break-all
                    bg-${(todo.isCompleted)?"green":"gray"}-100
                    hover:bg-${(todo.isCompleted)?"green":"gray"}-200
                    hover:border-${(todo.isCompleted)?"green":"violet"}-500
                    text-${(todo.isCompleted)?"green-600":"violet-800"}
                `}
                onClick={()=>setPopup(!popup)}
                >
                    {todo.title}</p>
                <button 
                className={`
                    p-2
                    border-2 
                    border-${(todo.isCompleted)?"green":"red"}-500 
                    hover:bg-${(todo.isCompleted)?"green":"red"}-100
                    rounded 
                    active:bg-violet-100
                    ml-3
                `}
                onClick={(e)=>handleCompleted(e, todo)}
                >
                    <img src={(todo.isCompleted)?checked:check} alt="Star Todo"/>
                </button>
                <button 
                className="p-2 border-2 border-blue-700 rounded mx-2 hover:bg-blue-200"
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto',
                    })
                    document.body.style.overflow = "hidden"
                    setEditTodo(true)
                }}
                >
                    <img src={edit} alt="Edit Todo"/>
                </button>
                <button 
                className="p-2 border-2 border-red-500 rounded active:bg-red-200"
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto',
                    })
                    document.body.style.overflow = "hidden"
                    setDeleteTodo(true)
                }}
                >
                    <img src={bin} alt="Delete Todo" className="w-6" />
                </button>
            </div>

            <TodoModal popup={popup} todoId={todo._id} makeRequest={makeRequest} created={todo.createdAt} updated={todo.updatedAt}/>

            <EditTodo editTodo={editTodo} setEditTodo={setEditTodo} todo={todo} makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
            
            <DeleteModal deleteTodo={deleteTodo} setDeleteTodo={setDeleteTodo} todo={todo} setMakeRequest={setMakeRequest} makeRequest={makeRequest}/>
        </>
    )
}

export default Todo