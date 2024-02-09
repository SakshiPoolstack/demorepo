import React from "react";
import "./NavBaar.css";
import { NavLink } from "react-router-dom";

function NavBaar({user,logout}) {
  return (
    <div>
      <nav className="navBaar">
        <li>
          <NavLink to={"/login"}>
            <ul>Login</ul>
          </NavLink>
          <NavLink to={"/register"}>
            <ul>Register</ul>
          </NavLink>
          <NavLink to={"/todo"}>
            <ul>ToDO</ul>
          </NavLink>
          {user ? <button className="logout-button" onClick={logout}>Logout</button>: null}
        </li>
      </nav>
    </div>
  );
}

export default NavBaar;
