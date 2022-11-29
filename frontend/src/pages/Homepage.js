import { useContext, useState } from "react";

// router
import { Navigate } from "react-router-dom"

// context
import userContext from "../context/userContext";

// components
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Homepage = () => {

    /**
     * Used to make database calls only when you update, delete, create todos. It is passed as parameters to
     * couple of components
     */
    const [makeRequest, setMakeRequest] = useState(false)

    /**
     * Used to display homepage only if user is logged in else redirect to login page.
     */
    const { user } = useContext(userContext)

    if(user){
 
        return(
            <>
                <h1 className="my-6 text-2xl md:text-4xl font-medium text-violet-800 text-center">Create New Todo</h1>
                <div className="w-full md:w-2/3 mx-auto">
                    <TodoForm  task="create" buttonName="Create Todo" setMakeRequest={setMakeRequest} makeRequest={makeRequest}/>
                </div>
                <h1 className="mt-12 mb-6 text-2xl md:text-4xl font-medium text-violet-800 text-center">Your Todos!</h1>
                <TodoList makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
            </>
        )

    } 

    return <Navigate to="/login" />
}

export default Homepage