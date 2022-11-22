import TodoForm from "./components/TodoForm";
import UpdateForm from "./pages/UpdateForm";

const App = () => {

  function onSubmit(event){
    event.preventDefault();
    console.log("Axios POST request")
  }

  return(
   <>
    <TodoForm handleSubmit={onSubmit} buttonName="Create Todo"/>
    <UpdateForm/>
   </>
  )
}

export default App;
