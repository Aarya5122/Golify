import { useState } from "react";
import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import userContext from "./context/userContext";
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

const App = () => {

  /**
   * This will used to verify if a user is logged in or not. Hence is passed to userContext as value
   */
  const [user, setUser] = useState(null)

  return(
    <>
      <userContext.Provider value={{user, setUser}}>
        <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>
        <Footer/>
        </Router>
      </userContext.Provider>
    </>
  )
}

export default App;
