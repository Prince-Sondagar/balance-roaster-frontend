import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PublicRoute = ({ children }:any) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Navigate to="/" />;
  }
  return children;
};