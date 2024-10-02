import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../hooks/useAuth";

import LoginBg from "../assets/images/login-bg.png";
import Logo from "../assets/images/logo.png";
import Loading from "../component/Loading";


const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain 8 Characters")
});

const Login = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (values: {
    email: string;
    password: string;
  }) => {
    await login(values);
  };

  return (
    <div className="grid xlg:grid-cols-2 grid-cols-1 h-screen">
      <div className="bg-[#F4F9FD] xlg:flex justify-center itemx-center hidden relative h-full overflow-hidden">
        <div className="absolute bg-[#E6F3FB] h-full w-full -bottom-[35%] -left-[55%] z-10 rounded-full -rotate-45" />
        <div className="absolute bg-[#E6F3FB] h-3/4 w-[40%] -top-[60%] left-1/2 translate-x-[-50%] z-10 rounded-full" />
        <div className="absolute bg-[#E6F3FB] h-[200px] w-[200px] bottom-[20%] -right-[100px] z-10 rounded-full" />
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
      <div className="flex flex-col justify-center p-4 h-full overflow-auto bg-white">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="max-w-[450px] mx-auto xlg:w-[440px] md:w-[440px] w-full">
            <div className="flex justify-center mb-3">
              <img src={Logo} alt="Logo" className="w-[150px]" />
            </div>
            <h2 className="text-gray-700 text-center xsm:text-[26px] text-[22px] font-bold xsm:leading-[44px] xsm:pb-7 pb-5">
              Login to your account
            </h2>
            <h6 className="text-sm font-medium mb-1 text-secondary">Email</h6>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                {...register("email")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.email?.message}
              </span>
            </div>
            <div className="mb-6">
              <h6 className="text-sm font-medium mb-1 text-secondary">
                Password
              </h6>
              <input
                type="password"
                placeholder="Password"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-2 text-secondary placeholder:text-secondary/40"
                {...register("password")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.password?.message}
              </span>
            </div>
            <div className="flex justify-between items-center pb-8">
              <div>
                <label className="container block relative cursor-pointer">
                  <input
                    type="checkbox"
                    className="absolute top-0 left-0 h-0 w-0 cursor-pointer"
                  />
                  <span className="checkmark mt-0.5 absolute top-0 left-0 h-4 w-4 bg-white border border-light-gray after:absolute after:hidden rounded-sm after:top-[0.5px] after:left-[4.5px] after:w-[5px] after:h-2.5 after:rotate-45" />
                </label>
                <span className="text-sm block pl-6 text-secondary">
                  Remember Me
                </span>
              </div>
              <Link
                to="/forgot-password"
                className=" text-sm font-medium transition duration-300 text-primary/70 hover:text-primary"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="text-white py-1.5 bg-primary text-white rounded-md px-8 w-full text-lg font-bold border-2 border-primary hover:bg-white hover:text-primary transtion duration-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loading isShowing={isLoading} /> : `Login`}
            </button>
            <p className="text-sm text-base text-center text-secondary mt-3">
              Not Registered Yet?
              <Link
                to="/signup"
                className=" pl-2.5 font-medium transition duration-300 text-primary/70 hover:text-primary "
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
