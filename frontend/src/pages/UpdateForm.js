import TodoForm from "../components/TodoForm"

const UpdateForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Axios PUT request")
    }

    return(
        <TodoForm handleSubmit={handleSubmit} buttonName="Update Todo"/>
    )
}

export default UpdateForm