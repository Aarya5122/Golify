import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Homepage = () => {
    return(
        <>
            <h1 className="my-6 text-2xl font-bold text-violet-800 text-center">Create New Todo</h1>
            <TodoForm  task="create" buttonName="Create Todo"/>
            <h1 className="mt-12 mb-6 text-2xl font-bold text-violet-800 text-center">Your Todos!</h1>
            <TodoList/>
        </>
    )
}

export default Homepage