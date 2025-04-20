import { NavLink } from "react-router-dom";

const Nav = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Finance", path: "/finance" },
    { name: "Rents", path: "/rents" },
    { name: "Events", path: "/events" },
  ]
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
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-1 rounded transition duration-200 ${
                  isActive ? "bg-green-500 text-white" : "text-gray-800 hover:bg-green-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <h1 className="text-lg font-medium text-gray-800">User Name</h1>
            <button className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">
              Profile
            </button>
          </div>
          <img
            src="/profile.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
