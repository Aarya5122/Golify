import { useState, useEffect, useContext } from "react"

// axios
import axios from "axios"

// context
import userContext from "../context/userContext"

// images
import searchIcon from "../assets/icons/search.png"
import closeIcon from "../assets/icons/close.png"

// components
import Todo from "./Todo"

/**
 * @param setMakeRequest - To make DB call and populate todos in todoList. When we delete, update todo.
 * @returns Collection of todos received from server request.
 */
const TodoList = ({makeRequest, setMakeRequest}) => {

    /**
     * It is used to pass appwrite Id in DB request parmas
     */
    const {user} = useContext(userContext)

    /**
     * To store the todos received from a server request.
     */
    const [todos, setTodos] = useState([])

    /**
     * To store the search string.
     */
    const [search, setSearch] = useState("")

     /**
     * To display cancel button after searching todo.
     */
    const [closeSearch, setCloseSearch] = useState(false)



    
    /**
     * getTodos() - Asynchronous Function
     *            - Fetches all the user's todos stored in database by making a server request.
     */
     const getTodos = async () => {
        try{
            const response = await axios.get("/user/todos", {params:{userId: user.$id}})
            const {data} = response
            data.user.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.user.todos])
        }catch(error){
            console.log("Error while fetching todos in getTodos method")
            console.log("Error: ", error)
        }     
    }

    /**
     * handleSearch() - Asynchronous Function
     *            - Prevents the default action of event
     *            - Trims the search value 
     *            - if search value is falsy it returns without proceeding
     *            - Fetches the user todos which have title or tasks like the search value passed .
     *            - Sorts the todo based on priority
     *            - Sets the closeSearch state to true stating to render the cancel button
     */
    const handleSearch = async (e) => {
        try{
            e.preventDefault()
            setSearch(search.trim())
            if(!search) return
            const response = await axios.get("http://localhost:4000/todo/search", {params:{search ,userId: user.$id}})
            const {data} = response
            data.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.todos])
            setCloseSearch(true)
        }catch(error){
            console.log("Error while fetching search todos in getTodos method")
            console.log("Error: ", error)
        }     
    }

    /**
     *  @param - sort: takes the string value to know what parameter to sort.
     * handleSort() - Asynchronous Function
     *            - Store todos in a variable sortTodos .
     *            - Validate if sort is createdAt or title. If so sort it in ascending order.
     *            - Validate if sort is updatedAt or isImportant. If so sort it in descending order.
     *            - Sets the todos state with sortTodos values.
     */
    const handleSort = (sort) => {
        const sortTodos = todos
        if(sort !== "isImportant" && sort !=="updatedAt" && sort !=="isCompleted"){
            sortTodos.sort((a,b)=>{
                if(a[sort]>b[sort]) return 1
                if(a[sort]<b[sort]) return -1
                return 0
            })
        } else {
            sortTodos.sort((a,b)=>{
                if(a[sort]>b[sort]) return -1
                if(a[sort]<b[sort]) return 1
                return 0
            })
        }
        setTodos([...sortTodos])
    }

    useEffect(()=>{
        getTodos()
        setCloseSearch(false)
    }, [makeRequest])

    return(
        <>
            <div 
            className="
                flex 
                flex-wrap
                items-center 
                justify-between 
                my-4 
                w-full
                sm:w-2/3 
                m-auto 
            ">
                {
                    (closeSearch)?
                    <button
                    className="border border-red-700 rounded p-2 ml-6 sm:ml-3 md:p-3 my-4 lg:my-0"
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
                <div className="order-2 ml-6 sm:ml-2 my-4 lg:order-none md:ml-0">
                    <label htmlFor="sort">
                        <span className="font-medium text-violet-800">Sort by: </span>
                        <select defaultValue="isImportant" 
                        onChange={(event)=>{
                            handleSort(event.target.value)

                        }}
                        className="border-violet-500 rounded text-violet-800 font-semibold py-0.5"
                        >
                            <option value="isImportant" className="px-2">Priority</option>
                            <option value="isCompleted" className="px-2">Completed</option>
                            <option value="createdAt" className="px-2">Created Date</option>
                            <option value="updatedAt" className="px-2">Updated Date</option>
                            <option value="title" className="px-2">Alphabetical</option>
                        </select>
                    </label>
                </div>
                <div 
                className="
                    flex 
                    items-center 
                    w-full
                    mx-5
                    sm:mx-2
                    lg:mx-3
                    lg:w-7/12
                    lg:mx-0
                    xl:w-5/12
                ">
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
                    className="
                        w-full 
                        border-r-transparent 
                        border-violet-700 
                        rounded-l
                        text-sm 
                        lg:text-lg 
                        placeholder-violet-700 
                        leading-4
                        lg:leading-7 
                        py-2 
                        text-violet-800 
                        font-medium 
                        outline-none 
                        focus:ring-0
                    "
                    />
                    <button
                    className="
                        border 
                        border-violet-700 
                        rounded-r
                        p-[5.3px]
                        lg:p-3
                    "
                    type="button"
                    onClick={(e)=>handleSearch(e)}
                    >
                        <img src={searchIcon} alt="search button" />
                    </button>
                </div>
            </div>
            <div className="border-2 w-[95%] sm:w-2/3 mx-auto mb-12 pr-2 pb-1 rounded">
                {
                    (todos.length === 0)?
                        (!closeSearch)?
                        <p className="text-2xl font-semibold text-violet-800 text-center p-2">Your have no todos left...!</p>
                        :
                        <p className="text-sm md:text-2xl font-semibold text-violet-800 text-center p-2">No todos or tasks available with respect to your search</p>
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