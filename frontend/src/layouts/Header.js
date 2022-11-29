import { useContext } from "react"

// appwrite
import account from "../config/appwriteConfig"

// context
import userContext from "../context/userContext"

// router
import { Link } from "react-router-dom";

const Header = () => {

    /**
     * It is used to conditionally render username, logout options to user if logged in else to display
     * login and signup.
     * It is also set to null if user logs out.
     */
    const { user, setUser } = useContext(userContext)

    /**
     * handleLogout() - Asynchronous Function
     *      - Logs the user out using deleteSession service of appwrite.
     *      - Updates the userContext to null meaning the user is logged out.
     */
    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            console.log("USER LOGGED OUT");
            setUser(null)
        } catch (error) {
            console.log("Error in handle logout appwrite service")
            console.log("Error Message: ", error.message);
        }
    }

    return(
        <header className="sticky bg-white w-full top-0">
          <nav className="flex py-1 border-b-2 text-violet-800">
            <span className="text-3xl font-medium ml-3 md:ml-40">Golify</span>
            <ul className="w-full flex items-center flex-wrap justify-end gap-4">
              {
                (user)?(
                    <>
                        <li className="text-sm lg:text-xl font-medium">{user.name}</li>
                        <li className="text-sm lg:text-xl font-medium mr-3 md:mr-10 lg:mr-20 "
                        onClick={handleLogout}>Logout</li>
                    </>
                ):(
                    <>
                        <li className="text-sm lg:text-xl font-medium">
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li className="text-sm lg:text-xl mr-3 md:mr-10 lg:mr-20  font-medium">
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )
              }
            </ul>
          </nav>
        </header>
    )
}

export default Header