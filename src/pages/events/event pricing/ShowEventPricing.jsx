import { useState } from "react";
import EventPricingPopup from "./EventPricingPopup";

const ShowEventPricing = ({ data, className, state, setState, style }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  return (
    <div className={className} style={style} onClick={() => setShowPopup(true)}>
      <p>{data.hall_rent_category.name}</p>
      <p>{data.event_type.name}</p>
      <p>{data.hall_rent.hall_rent}</p>
      <p>{data.hall_rent.administrative_charge}</p>
      <p>{data.hall_rent.total_charge}</p>
      <p>{data.hall_rent?.remarks}</p>
      <EventPricingPopup
        state={state}
        setState={setState}
        showPopup={showPopup}
        handleClose={handleClose}
        id={data.id}
      />
    </div>
  );
};

export default ShowEventPricing;
