import { useState } from "react";
import HallRentPopup from "./HallRentPopup";

const ShowHallRent = ({item,className,state,setState}) => {
    const [showHallRent,setShowHallRent] = useState(false);
    const handleClose = () => setShowHallRent(false);
  return (
    <div className={className} title={item?.remarks} onClick={()=>setShowHallRent(true)}>
      <p>{item?.hall_rent_category.name} </p>
      <p>{item?.hall_rent} </p>
      <p>{item?.administrative_charge} </p>
      <p>{item?.total_charge} </p>
      <HallRentPopup showHallRent={showHallRent} setShowHallRent={setShowHallRent} handleClose={handleClose} id={item.id} state={state} setState={setState}/>
    </div>
  );
};

export default ShowHallRent;
