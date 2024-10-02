import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedRoute = ({ children }:any) => {
  const { isLogin } = useAuth();
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
};