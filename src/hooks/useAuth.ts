import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordAction,
  loginAction,
  resetPasswordAction,
  logoutAction,
  signupAction,
} from "../store/actions/user.action";
import { RootState } from "../store";
import { UserState, setIsToast } from "../store/reducers/user.reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { user, isLogin, isToast, isLoading } = useSelector<RootState, UserState>(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (body: { email: string; password: string }) => {
    return dispatch<any>(loginAction(body));
  };

  const signup = async (body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    return dispatch<any>(signupAction(body));
  };

  const forgetPassword = async (body: { email: string }) => {
    return dispatch<any>(forgetPasswordAction(body));
  };

  const resetPassword = async (body: { password: string; token: string }) => {
    return dispatch<any>(resetPasswordAction(body));
  };

  const logout = async () => {
    await dispatch<any>(logoutAction());
    navigate("/login")
  };

  useEffect(() => {
    // if (isToast) {
    //   toast(message, {
    //     type: "success",
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     onClose: () => {
    //       dispatch<any>(setIsToast({ isToast: false }));
    //     },
    //   });
    // }
  }, [isToast]);

  return {
    user,
    isLogin,
    isLoading,
    login,
    signup,
    logout,
    forgetPassword,
    resetPassword,
  };
};

export default useAuth;
