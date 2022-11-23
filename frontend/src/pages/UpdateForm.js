import TodoForm from "../components/TodoForm"

const UpdateForm = () => {
    return(
        <>
            <h1 
            className="
                my-6 
                text-2xl 
                font-bold 
                text-violet-800 
                text-center
            ">
                Edit your todo</h1>
            <TodoForm task="update" buttonName="Update Todo"/>
        </>
    )
}

export default UpdateForm