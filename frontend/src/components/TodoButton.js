/**
 * @param name - String, Used to receive a value of button (Button Text) .
 * @returns A Button element to submit the data in  form.
 */
const TodoButton = ({name="Todo Button"}) => {
    return(
        <button 
        className="
            mt-2 
            rounded 
            w-full 
            border-2 
            border-green-500 
            px-6 
            py-2 
            font-semibold 
            rounded-b 
            text-green-500 
            text-lg 
            active:bg-green-300 
            active:text-gray-600
        "
        >{name}</button>
    )
}

export default TodoButton