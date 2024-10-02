import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginBg from "../assets/images/login-bg.png";
import Logo from "../assets/images/logo.png";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain 8 Characters")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const urlToken = urlSearchParams.get("token")?.toString() ?? "";

  const { resetPassword, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (value: { password: string }) => {
    await resetPassword({ ...value, token: urlToken });
  };

  return (
    <div className="grid xlg:grid-cols-2 grid-cols-1 h-screen">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col justify-center p-4 h-full overflow-auto bg-white">
          <div className="max-w-[450px] mx-auto xl:w-[440px] xlg:w-auto md:w-[440px] w-full">
            <div className="flex justify-center mb-3">
              <img src={Logo} alt="Logo" className="w-[150px]" />
            </div>
            <h2 className="text-center text-gray-700 xsm:text-[26px] text-[22px] font-bold xsm:leading-[44px] xsm:pb-7 pb-5">
              Reset Password
            </h2>

            <div className="mb-6">
              <h6 className="text-sm font-medium mb-1 text-secondary">
                New Password
              </h6>
              <input
                type="password"
                placeholder="password"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                {...register("password")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.password?.message}
              </span>
            </div>
            <div className="mb-6">
              <h6 className="text-sm font-medium mb-1 text-secondary">
                Confirm New Password
              </h6>
              <input
                type="password"
                placeholder="Password"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                {...register("confirmPassword")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.confirmPassword?.message}
              </span>
            </div>
            <button
              className="text-white py-1.5 bg-primary text-white rounded-md px-8 w-full text-lg font-bold border-2 border-primary hover:bg-white hover:text-primary transtion duration-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loading isShowing={isLoading} /> : `Reset Password`}
            </button>
            <p className="text-sm text-base text-center text-secondary mt-3">
              Return to,
              <Link
                to="/login"
                className="pl-2.5 font-medium transition duration-300 text-primary/70 hover:text-primary "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
      <div className="bg-[#F4F9FD] xlg:flex justify-center itemx-center hidden relative h-full overflow-hidden">
        <div className="absolute bg-[#E6F3FB] h-full w-full -bottom-[35%] -right-[55%] z-10 rounded-full -rotate-45" />
        <div className="absolute bg-[#E6F3FB] h-3/4 w-[40%] -top-[60%] left-1/2 translate-x-[-50%] z-10 rounded-full" />
        <div className="absolute bg-[#E6F3FB] h-[200px] w-[200px] bottom-[20%] -left-[100px] z-10 rounded-full" />
        <div className="flex items-center w-[655px]">
          <div className="relative w-full">
            <img
              src={LoginBg}
              alt="LoginBg"
              className="w-full object-cover relative z-20"
            />
            <div className="absolute bg-[#DDEFF9] h-[90%] w-[90%] top-[10%] left-[10%] z-10 rounded-full rotate-[35deg]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
