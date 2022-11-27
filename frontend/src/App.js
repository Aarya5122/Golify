import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
// import UpdateForm from "./pages/UpdateForm";

const App = () => {
  return(
    <>
      <header className="sticky bg-white w-full top-0">
        <nav className="flex py-1 border-b-2 text-violet-800">
          <span className="text-3xl font-medium ml-3 md:ml-40">Golify</span>
          <ul className="w-full flex items-center justify-end">
          <li className="text-sm lg:text-xl mr-3 md:mr-10 lg:mr-20 font-medium"><a href="https://github.com/aarya5122/Golify">Code</a></li>
            <li className="text-sm lg:text-xl mr-3 md:mr-10 lg:mr-20 font-medium"><a href="https://github.com/aarya5122">Github</a></li>
            <li className="text-sm lg:text-xl mr-3 md:mr-10 lg:mr-20 font-medium"><a href="https://aaryadev.netlify.app">Portfolio</a></li>
          </ul>
        </nav>
      </header>
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      <Homepage/>
      <footer>
      <nav className="flex py-3 border-t-2 text-violet-800">
          <span className="text-md lg:text-xl font-medium ml-6">Flaticon authors</span>
          <ul className="w-[75%] flex flex-wrap justify-end">
            <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a href="https://www.flaticon.com/authors/pixel-perfect" title="star icons">Pixel</a></li>
            <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a href="https://www.flaticon.com/authors/freepik" title="goal icons">Freepik</a></li>
            <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry"> Kiranshastry </a></li>
            <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a href="https://www.flaticon.com/authors/catalin-fertu" title="search icons">Catalin</a></li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export default App;
