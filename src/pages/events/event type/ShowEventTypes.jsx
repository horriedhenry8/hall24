import { useState } from "react";
import EventTypesPopup from "./EventTypesPopup";

const ShowEventTypes = ({ data, state, setState }) => {
  return (
    <div className="w-full border border-gray-300 rounded-b-lg overflow-hidden">
      {/* No data state */}
      {data?.length === 0 && (
        <div className="flex justify-center items-center h-32">
          <h1 className="text-gray-500 font-semibold">No Event Types</h1>
        </div>
      )}

      {/* Data rows */}
      {data?.map((item, id) => (
        <Row
          key={item.id}
          data={item}
          state={state}
          setState={setState}
          className={`flex items-center justify-between text-sm border-t border-gray-300 ${
            id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
          } hover:bg-gray-300 px-4 py-2 cursor-pointer`}
        />
      ))}
    </div>
  );
};

const Row = ({ data, className, state, setState }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);

  return (
    <div className={className} onClick={() => setShowPopup(true)}>
      <h1>{data.name}</h1>
      <p
        className={`${
          data.status === "active" ? "bg-teal-700" : "bg-red-500"
        } text-white px-1.5 rounded-lg w-fit`}
      >
        {data.status}
      </p>
      <EventTypesPopup
        showPopup={showPopup}
        handleClose={handleClose}
        id={data.id}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default ShowEventTypes;
