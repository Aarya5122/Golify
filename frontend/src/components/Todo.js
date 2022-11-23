import bin from "../assets/icons/delete.png"
import edit from "../assets/icons/edit.png"
import axios from "axios"

/**
 * @param todo - Object.
 * @returns A Todo element.
 */
const Todo = ({todo}) => {

    /**
     * @param todoId - ._id value of a todo .
     * handleDelete() - Asynchronous Function (Server Request).
     *                - Deletes todo based in database based on id value of todo.
     */
    const handleDelete = async (event, todoId) => {
        try{
            event.preventDefault()
            await axios.delete(`/todo/${todoId}`)
        } catch(error){
            console.log("Error while deleting a todo in handleDelete method")
            console.log("Error: ", error)
        }
    }

    return(
        <div className="flex my-2 justify-center">
            <p className="
                w-5/6 
                border-2 
                hover:border-violet-400 
                p-2 
                rounded 
                text-xl 
                bg-gray-100 
                hover:bg-violet-200 
                text-violet-800 
                font-medium
            ">
                {todo.title}</p>
            <button className="py-2 px-4 border-2 border-blue-700 rounded active:bg-blue-200 mx-3">
                <img src={edit} alt="Edit Todo"/>
            </button>
            <button 
            className="py-2 pl-4 pr-3.5 border-2 border-red-500 rounded active:bg-red-200"
            onClick={(event)=>handleDelete(event, todo._id)}
            >
                <img src={bin} alt="Delete Todo" width="24"/>
            </button>
        </div>
    )
}

export default Todo