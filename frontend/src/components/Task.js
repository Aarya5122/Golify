import bin from "../assets/icons/delete.png"

const Task = ({body}) => {
    return(
        <div className="inline-block m-2 flex">
            <p 
            className="p-1 max-w-sm border border-t-violet-500 border-b-violet-500 border-l-violet-500 border-r-transparent rounded-l p-0.5 bg-violet-100">
                {(body)?body:"NJdbbd  ajsdhuiagd sadbiagd dkygdbas fdfjdbf dkj duhdygabd hgdyugfagv dagdyufvd ahdsuitagdba dhgdgavd"}
            </p>
            <button 
            className="border border-red-500 rounded-r p-0.5 active:bg-red-200 pl-2 pr-1">
                <img className="inline-block mb-1" src={bin} alt="Delete icon" width="16"/>
            </button>
        </div>
    )
}

export default Task