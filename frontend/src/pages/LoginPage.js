import TodoButton from "../components/TodoButton"
import logo from "../assets/logo.png"

const LoginPage = () => {
    return(
        <div className="
            w-5/6
            md:w-3/4 
            lg:w-2/3
            xl:w-1/3
            h-[85vh] 
            m-auto 
            flex 
            flex-col 
            justify-center 
            items-center
            gap-6
        ">
            <img src={logo} alt="Golify Logo" className="-mt-10 w-5/6 max-w-md" />
            <form className="border border-violet-500 rounded py-4 px-2">

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
                id="email" />

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
                id="password" />

                <TodoButton name="Login"/>

            </form>
        </div>
    )
}

export default LoginPage