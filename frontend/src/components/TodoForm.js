import TaskInput from "./TaskInput"
import TitleInput from "./TitleInput"
import TodoButton from "./TodoButton"

const TodoForm = ({handleSubmit, buttonName}) => {

    return(
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-2/3 m-auto border rounded border-violet-400 p-4  bg-white">
                <div className='w-full flex p-2'>
                    <div className="w-1/2">
                        <TitleInput/>
                    </div>
                    <div className="w-1/2">
                       <TaskInput/>
                    </div>
                </div>
                <TodoButton name={buttonName}/>
            </div>
        </form>
        
    )
}

export default TodoForm