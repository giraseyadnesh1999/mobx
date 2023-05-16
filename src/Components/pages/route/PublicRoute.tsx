import React, { useState } from "react";
import { getToken } from "../auth/authUser";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: any;
  redirect?: string;
}

const PublicRoute = ({ children, redirect = "/dashboard" }: Props) => {
  if (getToken()) {
    console.log("getToken",getToken)
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;