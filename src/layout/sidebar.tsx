import { Link, useLocation } from "react-router-dom";
// @ts-ignore
import Logo from "../assets/images/logo.png";
import {
  ArrowDownTrayIcon,
  ArrowRightOnRectangleIcon,
  DocumentIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div>
      <div
        className={`w-[320px] border-r h-screen shadow-2xl fixed lg:block hidden bg-white`}
      >
        <div className="px-6 border-b py-3">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-10" />
          </Link>
        </div>
        <div className="py-3 px-5 h-[calc(100vh-65px-107px)]">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "bg-primary hover:bg-primary text-white"
                : ""
            } text-secondary inline-flex font-medium leading-[23px] py-2 px-3 w-full hover:bg-gray-500/10 rounded-lg transition duration-300`}
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/document"
            className={`${
              location.pathname === "/document"
                ? "bg-primary hover:bg-primary text-white"
                : ""
            } text-secondary inline-flex font-medium leading-[23px] py-2 px-3 w-full hover:bg-gray-500/10 rounded-lg transition duration-300 mt-1`}
          >
            <DocumentIcon className="h-5 w-5 mr-3" />
            Document
          </Link>
          {/* <Link to="/subscriptions" className={`${location.pathname === "/subscriptions" ? "bg-primary hover:bg-primary text-white" : ""} text-secondary inline-flex font-medium leading-[23px] py-2 px-3 w-full hover:bg-gray-500/10 rounded-lg transition duration-300`}>
            <HomeIcon className="h-5 w-5 mr-3" />
            Subscriptions
          </Link> */}
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible" : "invisible"
        }  h-screen w-screen bg-gray-900/50 fixed top-0 transition-all duration-200 lg:hidden z-50`}
      >
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          } w-[320px] bg-white border-r shadow-2xl overflow-y-auto transition-all duration-700`}
        >
          <div className="px-6 border-b py-3 flex justify-between">
            <Link to="/">
              <img src={Logo} alt="logo" className="h-10" />
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-slate" />
            </button>
          </div>
          <div className="py-3 px-5 h-[calc(100vh-65px-107px)]">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "bg-primary hover:bg-primary text-white"
                  : ""
              } text-secondary inline-flex font-medium leading-[23px] py-2 px-3 w-full hover:bg-gray-500/10 rounded-lg transition duration-300`}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/document"
              className={`${
                location.pathname === "/document"
                  ? "bg-primary hover:bg-primary text-white"
                  : ""
              } text-secondary inline-flex font-medium leading-[23px] py-2 px-3 w-full hover:bg-gray-500/10 rounded-lg transition duration-300 mt-1`}
            >
              <DocumentIcon className="h-5 w-5 mr-3" />
              Document
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
