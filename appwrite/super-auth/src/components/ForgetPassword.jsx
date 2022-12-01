import React from "react";

const ForgetPassword = () => {
  return (
    <div className="container-xl p-3 my-5 border">
      <h2 className="text-center"> Password Recovery</h2>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter you email
          </label>
          <input
            
            type="email"
            name="password"
            required
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button className="btn btn-primary">Reset password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
