import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Homepage = () => {

    const [makeRequest, setMakeRequest] = useState(false)

    return(
        <>
            <h1 className="my-6 text-2xl md:text-4xl font-medium text-violet-800 text-center">Create New Todo</h1>
            <div className="w-full md:w-2/3 mx-auto">
                <TodoForm  task="create" buttonName="Create Todo" setMakeRequest={setMakeRequest} makeRequest={makeRequest}/>
            </div>
            <h1 className="mt-12 mb-6 text-4xl font-medium text-violet-800 text-center">Your Todos!</h1>
            <TodoList makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
        </>
    )
}

export default Homepage