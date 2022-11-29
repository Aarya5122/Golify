import { useState, useContext } from "react"

// appwrite
import account from "../config/appwriteConfig"

// context
import userContext from "../context/userContext"

// images
import logo from "../assets/logo.png"

// router
import { Navigate } from "react-router-dom"

// components
import TodoButton from "../components/TodoButton"

const LoginPage = () => {

     /**
     * It is used to redirect user to homepage once the user logins into application using createEmailSession
     * service of appwrite.
     */
    const  {user, setUser} = useContext(userContext)

    /**
     * Used to store user email and password from input fields and pass them to appwrite service.
     */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    /**
     * handleLogin(e) - Asynchronous Function
     *      - Prevents the default reload of the webpage on submission of form.
     *      - Use appwrite createEmailSession service and pass the user email and password. If cobination
     *        is valid then it creates a session key-value pair in cookie and also store it in localstorage.
     *      - Navigate to homepage on successfull login
     *      - We set the Logged in user to userContext
     */
    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await account.createEmailSession(email, password);
            console.log("USER LOGGEDIN SUCCESSFULLY")
            setUser(await account.get())
        } catch(error){
            console.log("Error in handle login appwrite service")
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

    if(user){
        return <Navigate replace to="/"/>
    }
    return(
        <div className="
            w-5/6
            md:w-3/4 
            lg:w-2/3
            xl:w-1/3
            h-[86vh] 
            m-auto 
            flex 
            flex-col 
            justify-center 
            items-center
            gap-6
        ">
            <img src={logo} alt="Golify Logo" className="-mt-10 w-5/6 max-w-md" />
            <form 
            className="border border-violet-500 rounded py-4 px-2"
            onSubmit={(e)=>handleLogin(e)}>

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
                onChange={(e)=>handleChange(e, setPassword)}/>

                <TodoButton name="Login" />

            </form>
        </div>
    )
}

export default LoginPage