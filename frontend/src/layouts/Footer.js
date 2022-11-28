const Footer = () => {
  return(
    <footer>
      <nav className="flex py-3 border-t-2 text-violet-800">
        <span className="text-md lg:text-xl font-medium ml-6">Flaticon authors</span>
        <ul className="w-[75%] flex flex-wrap justify-end">
          <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a rel="noreferrer" target="_blank" href="https://www.flaticon.com/authors/pixel-perfect" title="star icons">Pixel</a></li>
          <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a rel="noreferrer" target="_blank" href="https://www.flaticon.com/authors/freepik" title="goal icons">Freepik</a></li>
          <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a rel="noreferrer" target="_blank" href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry"> Kiranshastry </a></li>
          <li className="text-sm lg:text-xl mr-3 lg:mr-20 font-medium"><a rel="noreferrer" target="_blank" href="https://www.flaticon.com/authors/catalin-fertu" title="search icons">Catalin</a></li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer