import { Link, NavLink } from "react-router-dom";
import logOut from "../components/logOut/logOut";
import { LogOut, Settings, User } from "lucide-react";

import { Button } from "../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState } from "react";
import DocumentTitle from "../hook/DocumentTitle";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Rents", path: "/rents" },
    { name: "Events Settings", path: "/events" },
    { name: "Book Event", path: "/book-event" },
  ];
  return (
    <header className="bg-gray-100 shadow-md py-4 px-4">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src="/logo.png" alt="Logo" className="w-16" />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <div key={item.name}>
              <NavLink to={item.path}>
                {({ isActive }) => {
                  const linkClasses = `px-4 py-1 rounded transition duration-200 ${
                    isActive
                      ? "bg-teal-700 text-white"
                      : "text-gray-800 hover:bg-teal-100"
                  }`;

                  return (
                    <div className={linkClasses}>
                      {isActive && <DocumentTitle data={item.name} />}
                      {item.name}
                    </div>
                  );
                }}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* User Profile */}

        <div className="p-2">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2"
          >
            <div className="">
              <h1>User Name</h1>
              <p>Profile</p>
            </div>
            <div className="">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </button>
          {dropdownOpen && (
  <div
    className="fixed bg-white shadow-lg rounded-md p-1 border border-gray-400 mt-2 right-0 w-48"
    onClick={toggleDropdown}
  >
    {/* Profile Link */}
    <NavLink to="/profile">
      {({ isActive }) => (
        <>
          {isActive && <DocumentTitle data="Profile" />}
          <div className="flex justify-between items-center hover:bg-gray-200 p-2 rounded-md">
            <div className="flex items-center text-lg space-x-2">
              <User className="w-4 h-4" />
              <p>Profile</p>
            </div>
            <p className="text-xs">⇧⌘P</p>
          </div>
        </>
      )}
    </NavLink>

    {/* Settings Link */}
    <NavLink to="/settings">
      {({ isActive }) => (
        <>
          {isActive && <DocumentTitle data="Settings" />}
          <div className="flex justify-between items-center hover:bg-gray-200 p-2 rounded-md">
            <div className="flex items-center text-lg space-x-2">
              <User className="w-4 h-4" />
              <p>Settings</p>
            </div>
            <p className="text-xs">⌘S</p>
          </div>
        </>
      )}
    </NavLink>

    {/* Logout Button */}
    <button
      onClick={logOut}
      className="flex justify-between items-center hover:bg-gray-200 p-2 rounded-md text-red-500 w-full"
    >
      <div className="flex items-center text-lg space-x-2">
        <LogOut className="w-4 h-4" />
        <p>Log Out</p>
      </div>
      <p className="text-xs">⇧⌘Q</p>
    </button>
  </div>
)}

        </div>
      </div>
    </header>
  );
};

export default Nav;
