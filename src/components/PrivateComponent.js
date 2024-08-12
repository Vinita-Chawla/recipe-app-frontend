import React from 'react';
import {Outlet, Navigate} from "react-router-dom"

function PrivateComponent() {
    let auth = localStorage.getItem("user");
  return auth? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateComponent
