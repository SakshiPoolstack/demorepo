import React, { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({
      ...credential,
      [name]: value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, credential.email, credential.password)
      .then((userData) => {
        console.log(userData.user);
        localStorage.setItem("userID", userData.user.uid);
        setIsLogin();
        navigate("/todo");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <div className="app">
      <div className="main-div">
        <h1>Login User</h1>
        <form className="form-filed" onSubmit={loginHandler}>
          <div className="input-div">
            <input
              type="text"
              name="email"
              placeholder="Enter First Name"
              className="input-text"
              value={credential.email}
              onChange={handleChange}
            />
            <input
              type="passwordnp"
              name="password"
              placeholder="Enter Password"
              className="input-text"
              value={credential.password}
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
