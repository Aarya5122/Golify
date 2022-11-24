import Homepage from "./pages/Homepage";
// import UpdateForm from "./pages/UpdateForm";

const App = () => {
  return(
    <>
      <header className="sticky bg-white w-full top-0">
        <nav className="flex py-1 border-b-2 text-violet-800">
          <span className="text-3xl font-medium ml-40">Golify</span>
          <ul className="w-full flex justify-end">
          <li className="text-xl mr-20 font-medium"><a href="https://github.com/aarya5122/Golify">Source Code</a></li>
            <li className="text-xl mr-20 font-medium"><a href="https://github.com/aarya5122">Developer Github Profile</a></li>
            <li className="text-xl mr-20 font-medium"><a href="https://aaryadev.netlify.app">Developer Portfolio</a></li>
          </ul>
        </nav>
      </header>
      <Homepage/>
      <footer>
      <nav className="flex py-3 border-t-2 text-violet-800">
          <span className="text-xl font-medium ml-6">Attribute to flaticon authors</span>
          <ul className="w-[75%] flex justify-end">
            <li className="text-xl mr-20 font-medium"><a href="https://www.flaticon.com/authors/pixel-perfect" title="star icons">Pixel perfect</a></li>
            <li className="text-xl mr-20 font-medium"><a href="https://www.flaticon.com/authors/freepik" title="goal icons">Freepik</a></li>
            <li className="text-xl mr-20 font-medium"><a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry"> Kiranshastry </a></li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export default App;
