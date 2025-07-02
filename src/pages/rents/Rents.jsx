import { useState } from "react";
import HallRentCategory from "./child/HallRentCategory/HallRentCategory";
import HallRent from "./child/HallRent/HallRent";

const Rent = () => {
  const [activeTab, setActiveTab] = useState("HallRentCat");

  return (
    <div className="py-4 px-8 mx-auto">
      <nav className="grid grid-cols-2 justify-items-stretch text-center cursor-pointer gap-2.5 p-1 bg-gray-200">
        <button
          onClick={() => setActiveTab("HallRentCat")}
          className={`rounded ${
            activeTab === "HallRentCat"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Hall Rent Category
        </button>
        <button
          onClick={() => setActiveTab("HallRent")}
          className={`rounded ${
            activeTab === "HallRent"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Hall Rent
        </button>
      </nav>

      <div className="mt-4">
        {activeTab === "HallRentCat" && <HallRentCategory />}
        {activeTab === "HallRent" && <HallRent />}
      </div>
    </div>
  );
};

export default Rent;
