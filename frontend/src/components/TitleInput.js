/**
 * @param title - String (State).
 * @param setTitle - Function (Update State).
 * @returns Title Input Element.
 */

const TitleInput = ({title, setTitle}) => {

    /**
     * handleChange() - Updates the title value.
     */
    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    return(
        <label htmlFor="title">
            <input 
            className="
                text-4xl 
                h-16 
                text-violet-800 
                pl-2 
                pb-1 
                border-b-2 
                border-violet-300 
                focus:outline-none 
                focus:border-b-2 
                focus:border-violet-500 
                placeholder-violet-500
            "
            type="text" 
            id="title" 
            name="title" 
            placeholder="Todo Title"
            value={title}
            onChange={handleChange}
            onKeyPress={e => {
                if (e.key === 'Enter') e.preventDefault();
            }} />
        </label>
    )
}


export default TitleInput