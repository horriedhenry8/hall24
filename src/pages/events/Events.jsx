import EventPricing from "./event pricing/EventPricing";
import EventTypes from "./event type/EventTypes";

import { useState } from "react";

const Events = () => {
  const [activeTab, setActiveTab] = useState("EventTypes");

  return (
    <div className="py-4 px-8 mx-auto">
      <nav className="grid grid-cols-2 justify-items-stretch text-center cursor-pointer gap-2.5 p-1 bg-gray-200">
        <button
          onClick={() => setActiveTab("EventTypes")}
          className={`rounded ${
            activeTab === "EventTypes"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Events Types
        </button>
        <button
          onClick={() => setActiveTab("EventPricing")}
          className={`rounded ${
            activeTab === "EventPricing"
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-600  hover:bg-teal-100"
          }`}
        >
          Events Pricing
        </button>
      </nav>

      <div className="mt-4">
        {activeTab === "EventTypes" && <EventTypes/>}
        {activeTab === "EventPricing" && <EventPricing />}
      </div>
    </div>
  );
};

export default Events;
