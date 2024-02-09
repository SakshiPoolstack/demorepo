import React, { useState } from "react";
import Input from "../component/input/Input";
import "./Register.css";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

function Register({setIsLogin}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    setErrors(validate(formData));
    console.log(formData);

    setFormData({
      username: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    });

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (res) => {
        console.log(res.user);
        await setDoc(doc(db, "User", res.user.uid), {
          username: formData.username,
          email: formData.email,
          number: formData.number,
          userId: res.user.uid,
        });
        setIsLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (e) => {
    const validationErrors = {};
    const nameRegex = /^[A-Z]([-']?[a-z]+)*( [A-Z]([-']?[a-z])*)$/;
    const emailRegex = /^[a-z]+[a-z0-9._-]{0,20}@[a-z]{4,12}\.[a-z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=[a-zA-Z0-9#@$?]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/;

    if (!formData.username.trim()) {
      validationErrors.username = "username is required";
    } else if (!nameRegex.test(formData.username)) {
      validationErrors.username = "Enter Valid name";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Enter Valid Email";
    }

    if (!formData.number.trim()) {
      validationErrors.number = "number is required";
    } else if (!phoneRegex.test(formData.number)) {
      validationErrors.number = "Enter Valid Phone Number";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password = "Enter Valid Phone Number";
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Password not matched";
    }

    return validationErrors;
  };

  return (
    <div className="app">
      <div className="main-div">
        <h1>Register User</h1>
        <form className="form-filed" onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              type="text"
              name="username"
              placeholder="Enter First Name"
              className="input-text"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span>{errors.username}</span>}

            <input
              type="text"
              name="email"
              placeholder="Enter Gmail"
              className="input-text"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}

            <input
              type="text"
              name="number"
              placeholder="Enter Mobile"
              className="input-text"
              value={formData.number}
              onChange={handleChange}
            />
            {errors.number && <span>{errors.number}</span>}

            <input
              type="passwordnp"
              name="password"
              placeholder="Enter Password"
              className="input-text"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input-text"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

            <button type="submit" className="submit-button">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;