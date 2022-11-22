import TodoForm from "../components/TodoForm"

const UpdateForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Axios PUT request")
    }

    return(
        <>
            <h1 className="my-6 text-2xl font-bold text-violet-800 text-center">Edit your todo</h1>
            <TodoForm handleSubmit={handleSubmit} buttonName="Update Todo"/>
        </>
    )
}

export default UpdateForm