import React, { useState } from "react";
import SocialSignin from "./SocialSignin";
import { Link, useHistory } from "react-router-dom";
import { ID } from "appwrite";
import account from "../services/appwriteConfig";

const Signup = () => {

  const history = useHistory()

  const [userDetails, setUserDetails] = useState({
    email:"",
    password: "",
    name:"",
  })

  async function signUpUser(e){
    e.preventDefault()
    try{
      await account.create(
        ID.unique(),
        userDetails.email,
        userDetails.password,
        userDetails.name,
      )
      await account.createEmailSession(userDetails.email, userDetails.password)
      history.push("/home")
    } catch(error){
      console.log("User creation failed in create request");
      console.log("Error Message: ", error.message);
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-center">Super Auth</h2>
      <h3 className=" text-center">Signup</h3>

      <form className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            name="name"
            onChange={(e)=>setUserDetails(
              {
                ...userDetails,
                name: e.target.value
              }
            )}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="email"
            onChange={(e)=>setUserDetails(
              {
                ...userDetails,
                email: e.target.value
              }
            )}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(e)=>setUserDetails(
              {
                ...userDetails,
                password: e.target.value
              }
            )}
          />
        </div>
        <div className="mb-3">
          <span>Already have an account ? </span>{" "}
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>

        <button 
        type="submit" 
        className="btn btn-success"
        onClick={(e)=>signUpUser(e)}>
          Signup
        </button>
      </form>

      <SocialSignin />
    </div>
  );
};

export default Signup;
