import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPasswrod] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          username: userName,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success(response.data.message);
      setUserName("");
      setPasswrod("");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mx-auto text-primary mt-5" style={{ width: "200px" }}>
        LOGIN
      </h2>
      <div className="form-section mx-auto mt-5 w-75">
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group w-100">
            <label htmlFor="userid">UserName</label>
            <input
              type="text"
              id="userid"
              value={userName}
              className="form-control mb-2"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Enter User Name"
            />
          </div>
          <div className="form-group w-100">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              className="form-control mb-2"
              onChange={(e) => {
                setPasswrod(e.target.value);
              }}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-secondary form-control">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
