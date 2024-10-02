import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginBg from "../assets/images/login-bg.png";
import Logo from "../assets/images/logo.png";
import { User } from "../store/reducers/user.reducer";
import useAuth from "../hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";
import Loading from "../component/Loading";

const schema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain 8 Characters")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref('password')], 'Passwords must match')

});

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (value: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    await signup(value);
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
              Sign up to your account
            </h2>

            <div className="grid xsm:grid-cols-2 grid-cols-1 gap-6 mb-4">
              <div>
                <h6 className="text-secondary text-sm font-medium mb-1">
                  Firstname
                </h6>
                <input
                  type="text"
                  placeholder="Firstname"
                  {...register("firstname")}
                  className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                />
                <span className="text-[#F92B2B] text-sm">
                  {errors?.firstname?.message}
                </span>
              </div>
              <div>
                <h6 className="text-secondary text-sm font-medium mb-1">
                  Lastname
                </h6>
                <input
                  type="text"
                  placeholder="Lastname"
                  {...register("lastname")}
                  className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                />
                <span className="text-[#F92B2B] text-sm">
                  {errors?.lastname?.message}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <h6 className="text-sm font-medium mb-1 text-secondary">Email</h6>
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
            <div className="mb-4">
              <h6 className="text-sm font-medium mb-1 text-secondary">
                Password
              </h6>
              <input
                type="password"
                placeholder="Password"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                {...register("password")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.password?.message}
              </span>
            </div>
            <div className="mb-4">
              <h6 className="text-sm font-medium mb-1 text-secondary">
                Confirm Password
              </h6>
              <input
                type="confirmPassword"
                placeholder="Password"
                className="p-2.5 border border-light-gray rounded outline-none focus:border-primary w-full mb-1 text-secondary placeholder:text-secondary/40"
                {...register("confirmPassword")}
              />
              <span className="text-[#F92B2B] text-sm">
                {errors?.confirmPassword?.message}
              </span>
            </div>
            <div className="pb-8">
              <label className="container block relative cursor-pointer">
                <input
                  type="checkbox"
                  className="absolute top-0 left-0 h-0 w-0 cursor-pointer"
                />
                <span className="checkmark mt-0.5 absolute top-0 left-0 h-4 w-4 bg-white border border-light-gray after:absolute after:hidden rounded-sm after:top-[0.5px] after:left-[4.5px] after:w-[5px] after:h-2.5 after:rotate-45" />
              </label>
              <span className="text-sm block pl-6 text-secondary mt-4">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </div>
            <button
              className="text-white py-1.5 bg-primary text-white rounded-md px-8 w-full text-lg font-bold border-2 border-primary hover:bg-white hover:text-primary transtion duration-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loading isShowing={isLoading} /> : `Create your account`}
            </button>
            <p className="text-sm text-base text-center text-secondary mt-3">
              Already have an account?
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

export default Signup;
