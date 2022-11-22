const TitleInput = () => {
    return(
        <label htmlFor="title">
            <input 
            className="text-4xl text-violet-800 pl-2 pb-1 border-b-2 border-gray-200 focus:outline-none focus:border-b-2 focus:border-violet-500"
            type="text" 
            id="title" 
            name="title" 
            placeholder="Todo Title"
            onKeyPress={e => {
                if (e.key === 'Enter') e.preventDefault();
            }} />
        </label>
    )
}


export default TitleInput