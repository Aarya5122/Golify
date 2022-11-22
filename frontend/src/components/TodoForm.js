import Task from "./Task"

const TodoForm = () => {
    return(
        <form className="flex flex-col">
            <div className="w-2/3 m-auto border rounded border-violet-400 p-4">
                <div className='w-full flex p-2'>
                    <div className="w-1/2">
                        <label htmlFor="title">
                            <input 
                            className="text-4xl text-violet-800 pb-1 border-b-2 border-gray-200 focus:outline-none focus:border-b-2 focus:border-violet-500"
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Title"/>
                        </label>
                    </div>
                    <div className="w-1/2">
                        <div className="h-48 border rounded mb-4 py-2">
                            <div className="taskListContainer mb-6 min-h-fit max-h-44 overflow-auto flex flex-wrap">
                                <Task/>
                            </div>
                        </div>
                        
                        <div className="w-1/2 inline">
                            <label htmlFor="taskInput">
                                <input
                                className="pb-1 border-b-2 border-gray-200 text-lg focus:outline-none focus:border-b-2 focus:border-violet-500 w-3/4" 
                                type="text" 
                                id="taskInput" 
                                name="taskInput" 
                                placeholder="Enter your task"/>
                            </label>
                            <button
                            className="bg-violet-500 ml-2 px-6 py-2 text-white font-medium rounded active:bg-violet-400 active:text-gray-500"
                            >Add Task</button>
                        </div>
                    </div>
                </div>
                <button 
                className="mt-2 rounded w-full border-2 border-green-500 px-6 py-2 font-semibold rounded-b text-green-500 text-lg active:bg-green-300 active:text-gray-600"
                type="submit">Create Todo</button>
            </div>
        </form>
        
    )
}

export default TodoForm