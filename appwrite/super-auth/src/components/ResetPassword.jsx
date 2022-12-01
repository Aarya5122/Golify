import React from "react";

const ResetPassword = () => {
  return (
    <div>
      <div className="container-xl p-3 my-5 border">
        <h2 className="text-center"> Reset your password </h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your new password :
            </label>
            <input
              required
              type="password"
              name="password"
              
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Repeat your new password :
            </label>
            <input
              required
              type="password"
              name="password"
              
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button className="btn btn-success" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
