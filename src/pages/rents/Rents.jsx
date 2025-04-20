import { NavLink, Outlet } from "react-router-dom";

const Rents = () => {
  const navItems = [
    { name: "Rent Category", path: "/rents/rentcat" },
    { name: "Hall Rent", path: "/rents/hallrent" },
  ];
  return (
    <div className=" py-4 px-8 mx-auto">
      <nav className=" grid grid-rows-1 grid-cols-2 justify-items-stretch text-center gap-3 p-1 rounded bg-gray-200">
        {
          navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                ` rounded ${
                  isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))
        }
        
      </nav>
      <Outlet/>
    </div>
  );
};

export default Rents;
