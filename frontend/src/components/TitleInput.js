/**
 * @param title - String (State).
 * @param setTitle - Function (Update State).To update title value of todo
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
                text-2xl
                md:text-4xl 
                h-16 
                text-violet-800 
                w-full 
                lg:w-5/6
                pl-2
                pb-1 
                border-t-0 
                border-l-0 
                border-r-0 
                border-b-2 
                border-violet-300 
                focus:border-b-2 
                focus:border-violet-500 
                placeholder-violet-500
                focus:ring-0
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