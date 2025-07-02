import { useState } from "react";
import Bank from "./bank/bank/Bank";
import BankAcc from "./bank/bankAcc/BankAcc";
import CashAcc from "./bank/cashAcc/CashAcc";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("bank");

  return (
    <div className="py-4 px-8 mx-auto">
      <nav className="grid grid-rows-1 grid-cols-3 justify-items-stretch text-center cursor-pointer gap-2.5 p-1 bg-gray-200">
        <button
          onClick={() => setActiveTab("bank")}
          className={`rounded ${
            activeTab === "bank"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Bank
        </button>
        <button
          onClick={() => setActiveTab("bankacc")}
          className={`rounded ${
            activeTab === "bankacc"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Bank Account
        </button>
        <button
          onClick={() => setActiveTab("cashacc")}
          className={`rounded ${
            activeTab === "cashacc"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Cash Account
        </button>
      </nav>

      <div className="mt-4">
        {activeTab === "bank" && <Bank />}
        {activeTab === "bankacc" && <BankAcc />}
        {activeTab === "cashacc" && <CashAcc />}
      </div>
    </div>
  );
};

export default Finance;
