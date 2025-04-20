import { NavLink, Outlet } from "react-router-dom";

const Finance = () => {
  return (
    <div className="py-4 px-8 mx-auto">
      <nav className=" grid grid-rows-1 grid-cols-3 justify-items-stretch text-center gap-2.5 p-1 bg-gray-200">
        <NavLink
          to="/finance/bank"
          className={({ isActive }) =>
            ` rounded ${
              isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
            }`
          }
        >
          bank
        </NavLink>
        <NavLink
          to="/finance/bankacc"
          className={({ isActive }) =>
            ` rounded ${
              isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
            }`
          }
        >
          bank account
        </NavLink>
        <NavLink
          to="/finance/cashaa"
          className={({ isActive }) =>
            ` rounded ${
              isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
            }`
          }
        >
          cash account
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default Finance;
