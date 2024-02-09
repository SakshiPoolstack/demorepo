import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Protected({user}) {

  if (user) {
    console.log("if", user);
    return <Outlet/>
  } else {
    console.log("else", user);
    return <Navigate to={"/"} />;
  }
}

export default Protected