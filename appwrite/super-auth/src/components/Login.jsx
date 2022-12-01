import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import account from '../services/appwriteConfig';
import SocialSignin from './SocialSignin';

const Login = () => {

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault()
    await account.createEmailSession(userDetails.email, userDetails.password)
    history.push("/home")
  }

  const [userDetails, setUserDetails] = useState({
    email:"",
    password:""
  })

    return (
        <div>
          <h2 className="mt-5 text-center">Super Auth</h2>
          <h3 className=" text-center">Login</h3>
          <form className="container">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
               
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userDetails.email}
                onChange={e=>setUserDetails({...userDetails, email: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
               
                type="password"
                name="password"
                required
                className="form-control"
                id="exampleInputPassword1"
                value={userDetails.password}
                onChange={e=>setUserDetails({...userDetails, password: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <span>First time here ? </span>
              <Link to="/signup">
                <button className="btn btn-primary mx-1">Signup</button>
              </Link>
            </div>
  
            <div>
              <span>Forget password ? </span>
              <Link to='/forget-password' >
                <button
                  className="btn btn-danger mx-1"
                
                >
                  Forget Password
                </button>
              </Link>
            </div>
  
            <button
              type="submit"
              onClick={(e)=>handleLogin(e)}
              className="btn btn-success"
            >
              Login
            </button>
          </form>
        <SocialSignin/>
         
        </div>
      );
}

export default Login
