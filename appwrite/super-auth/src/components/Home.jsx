import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import account from '../services/appwriteConfig';

const Home = () => {

  const history = useHistory()

  const [userDetails, setUserDetails] = useState({});

  const fetchUser = async () => {
    try{
      const user = await account.get()
      setUserDetails(user)
      console.log(user);
    } catch(error){
      console.log(error.message);
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    setUserDetails({})
    await account.deleteSession("current")
    history.push("/")
  }

  const handleDelete = async(e) => {
    e.preventDefault()
    await account.updateStatus(userDetails.$id)
    history.push("/")
  }

  useEffect(()=>fetchUser(), [])
 
  if(Object.keys(userDetails).length)
  return (
        <div className="container-xxl border mt-5 p-3">
        <h3 className="text-center"> Super Auth </h3>
        <h6 className='d-flex justify-content-end' >Welcome, {userDetails.name} </h6>
        <div className="d-flex justify-content-end align-items-center">
          
          <button className="btn btn-danger mx-1"
          onClick={e=>handleLogout(e)}>Logout</button>
          <button className="btn btn-primary mx-1">Change Password</button>
        </div>
  
        <div className="my-3">
          <h6>UID : {userDetails.$id}</h6>
          <h6>Name : {userDetails.name}</h6>
          <h6>Email : {userDetails.email}</h6>
          <h6>Email Verified : {(userDetails.emailVerification)?"Done":"Pending"}</h6>
  
        <h6>Registered on : {new Date(userDetails.registration).toDateString()}</h6>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-outline-danger"
            onClick={e=>handleDelete(e)}
          >Delete Account</button>
        </div>
      </div>
    )

    else return(
      <p>Login to use this</p>
    )

}

export default Home
