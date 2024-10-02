import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const settingsOptions = [
  {
    href: "/profile",
    icon: <UserIcon className="w-5 h-5 mr-2" />,
    title: "Profile",
  },
  {
    href: "/security",
    icon: <LockClosedIcon className="w-5 h-5 mr-2" />,
    title: "Security",
  },
];

const Header = ({ isOpen, setIsOpen }: any) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="border-b fixed lg:w-[calc(100%-320px)] w-full z-20 bg-[#f9f9f9]">
      <div className="flex justify-between itemx-center lg:px-8 md:px-6 px-4 py-3">
        <button className="" onClick={() => setIsOpen(true)}>
          <Bars3Icon className="h-6 w-6 text-primary lg:hidden block" />
        </button>
        <div className="flex gap-4 items-center">
          <div className="relative group">
            <span className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center text-gray-500 group-focus-within:text-primary">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-[192px] xsm:w-[302px] h-10 pl-10 bg-gray-400/[0.15] placeholder-gray-500 transition duration-200 rounded-lg focus:border-primary/60 focus:outline-primary focus:bg-white"
            />
          </div>
          <Menu as="div" className="relative">
            <Menu.Button>
              <div className="bg-secondary rounded-full h-10 w-10 flex justify-center items-center text-white font-extrabold">
                TF
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute w-48 origin-top right-0 top-[46px] rounded-lg bg-white shadow-2xl border z-10">
                <div className="py-1.5">
                  {settingsOptions?.map((link) => (
                    <Menu.Item>
                      {({ active }: any) => (
                        <Link
                          to={link?.href}
                          className={`${
                            active ? "bg-gray-500/10" : ""
                          } flex w-full items-center px-4 py-2 text-sm text-secondary border-b border-b last:border-none`}
                        >
                          {link?.icon}
                          {link?.title}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <button
                      className={`flex w-full items-center px-4 py-2 text-sm text-secondary border-b border-b last:border-none`}
                    onClick={handleLogout}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                      Logout
                      </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
