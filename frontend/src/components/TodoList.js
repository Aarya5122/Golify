import { useState, useEffect } from "react"
import Todo from "./Todo"
import axios from "axios"
import searchIcon from "../assets/icons/search.png"
import closeIcon from "../assets/icons/close.png"

/**
 * @returns Collection of todos received from server request.
 */
const TodoList = ({makeRequest, setMakeRequest}) => {

    /**
     * To store the todos received from a server request.
     */
    const [todos, setTodos] = useState([])

    const [search, setSearch] = useState("")

    const [closeSearch, setCloseSearch] = useState(false)

    
    /**
     * getTodos() - Asynchronous Function
     *            - Fetches all the todos stored in database by making a server request.
     */
    const getTodos = async () => {
        try{
            const response = await axios.get("/todo/getAll")
            const {data} = response
            data.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.todos])
        } catch(error){
            console.log("Error while fetching todos in getTodos method")
            console.log("Error: ", error)
        }
    }

    const handleSearch = async (e) => {
        try{
            e.preventDefault()
            setSearch(search.trim())
            const response = await axios.get("/todo/search", { params: { search: search } })
            const {data} = response
            data.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.todos])
            setCloseSearch(true)
        }catch(error){
            console.log("Error while fetching search todos in getTodos method")
            console.log("Error: ", error)
        }     
    }

    useEffect(()=>{
        getTodos()
    }, [makeRequest])

    return(
        <>
            <div className="flex items-center justify-between my-4 w-2/3 m-auto ">
                {
                    (closeSearch)?
                    <button
                    className="border border-red-700 rounded p-3"
                    type="button"
                    onClick={(e)=>{
                        setCloseSearch(false)
                        setSearch("")
                        getTodos()
                    }}
                    >
                        <img src={closeIcon} alt="cancel search" width="20"/>
                    </button>
                    :
                    <div></div>
                }
                <div className="flex items-center w-5/12">
                    <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter") handleSearch(e)
                    }}
                    required
                    placeholder="Search for your todos / tasks"
                    className="w-full border-r-0 border-violet-700 rounded-l text-lg placeholder-violet-700 leading-7 py-2.5 text-violet-800 font-medium outline-none focus:ring-0"
                    />
                    <button
                    className="border border-violet-700 rounded-r p-3.5"
                    type="button"
                    onClick={(e)=>handleSearch(e)}
                    >
                        <img src={searchIcon} alt="search button" />
                    </button>
                </div>
            </div>
            <div className="border-2 w-2/3 mx-auto mb-12 pr-2 pb-1 rounded">
                {
                    (todos.length === 0)?
                    <p className="text-2xl font-semibold text-violet-800 text-center p-2">Your have no todos left...!</p>
                    :
                    todos.map((todo)=>(
                        <Todo todo={todo} key={todo._id} makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
                    ))
                }
            </div>
        </>
    )
}

export default TodoList