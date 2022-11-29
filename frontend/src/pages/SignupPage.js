import { useContext, useState } from "react"

// appwrite
import account from "../config/appwriteConfig"
import { ID } from "appwrite"

// axios
import axios from "axios"

// images
import logo from "../assets/logo.png"

// context
import userContext from "../context/userContext"

// router
import  { Navigate } from "react-router-dom"

// componetns
import TodoButton from "../components/TodoButton"


const SignupPage = () => {

    /**
     * It is used to redirect user to homepage once the user registers into application using create service 
     * of appwrite.
     */
    const {user, setUser} = useContext(userContext)

    /**
     * These states are used to store user values from input and pass it to appwrite service
     */
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profession, setProfession] = useState("")

    /**
     * handleSignup(e) - Asynchronous Function
     *          - Prevents the default reloading of the webpage
     *          - Register a new user into project using create(id, email, password, name) service
     *            ID.unique() - generates unique ID's for users
     *          - On successfull registration of user. A session is created using valid email and password
     *            This session are available in cookies as a key- value pair or in localstorage by default
     *          - We set the Registered user to userContext
     */
    const handleSignup = async (e) => {
        e.preventDefault()
        try{
            const appwriteUser = await account.create(
                ID.unique(),
                email,
                password,
                name 
            )
            console.log("USER CREATED SUCCESSFULLY IN APPWRITE")
            await axios.post("/user/create",
                {
                    name: appwriteUser.name,
                    email: appwriteUser.email,
                    appwriteId: appwriteUser.$id,
                    profession
                }
            )
            console.log("USER CREATED SUCCESSFULLY IN DB")
            await account.createEmailSession(email, password)
            console.log("USER LOGGEDIN SUCCESSFULLY")
            setUser(await account.get())
        } catch(error){
            console.log("Error in handle signup appwrite service")
            console.log("Error Message: ", error.message)
        }
    }

    /**
     * handleChange() - 
     * @param e - event
     * @param stateUpdate - takes a state updation function to update relevant state
     *      - This function updates the state based on the state updation function passed hence follows DRY.
     */
     const handleChange = (e, stateUpdate) => {
        stateUpdate(e.target.value)
    }

    if(user) return <Navigate replace to="/"/>

    return(
        <div className="
            h-[90vh]
            flex
            flex-col
            justify-center
            items-center  
            gap-6
            -mt-8
            lg:flex-row
            lg:justify-around
        ">
            <div className="w-3/5 lg:w-2/5 mx-auto">
                <img 
                src={logo} 
                alt="Golify Logo" 
                className="w-full mx-auto max-w-lg" />
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/5 mx-auto">
                <form 
                className="border border-violet-500 rounded py-4 px-2"
                onSubmit={(e)=>handleSignup(e)}>

                <input
                    className="
                        w-full
                        rounded
                        border-violet-700
                        text-lg
                        md:text-xl
                        mb-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-violet-800
                        placeholder-violet-700
                    " 
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e)=>handleChange(e, setName)} />

                    <input
                    className="
                        w-full
                        rounded
                        border-violet-700
                        text-lg
                        md:text-xl
                        mb-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-violet-800
                        placeholder-violet-700
                    " 
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>handleChange(e, setEmail)} />

                    <input 
                    className="
                        w-full
                        rounded
                        border-violet-700
                        text-lg
                        md:text-xl
                        mb-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-violet-800
                        placeholder-violet-700
                    " 
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=>handleChange(e, setPassword)} />

                    <input
                    className="
                        w-full
                        rounded
                        border-violet-700
                        text-lg
                        md:text-xl
                        mb-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-violet-800
                        placeholder-violet-700
                    " 
                    placeholder="Profession"
                    type="text"
                    name="profession"
                    id="profession" 
                    value={profession}
                    onChange={(e)=>handleChange(e, setProfession)}/>

                    
                        <TodoButton name="Signup"/>
                    
                    
                </form>
            </div>
        </div>
    )
}

export default SignupPage