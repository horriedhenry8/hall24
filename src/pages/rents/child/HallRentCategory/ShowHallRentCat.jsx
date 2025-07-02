import { useState } from "react";
import HallRentCatPopup from "./HallRentCatPopup";

const ShowHallRentCat = ({ className, item, state, setState }) => {
  const [showHallRentCat, setShowHallRentCat] = useState(false);
  const handleClose = () => setShowHallRentCat(false);

  return (
    <>
      <div className={className} onClick={() => setShowHallRentCat(true)}>
        <h1>{item.name}</h1>
        <p
          className={`${
            item.status === "active" ? "bg-teal-800" : "bg-red-500"
          } text-white px-2 py-0.5 rounded-full text-xs text-center w-fit`}
        >
          {item.status}
        </p>
      </div>

      <HallRentCatPopup
        show={showHallRentCat}
        handleClose={handleClose}
        id={item.id}
        state={state}
        setState={setState}
      />
    </>
  );
};

export default ShowHallRentCat;
