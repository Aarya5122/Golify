import TodoButton from "../components/TodoButton"
import logo from "../assets/logo.png"

const SignupPage = () => {
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
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name" />

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
                    id="profession" />

                    <TodoButton name="Register"/>
                    
                </form>
            </div>
        </div>
    )
}

export default SignupPage