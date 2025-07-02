import React, { useState } from "react";
import BankPopup from "./BankPopup";

const ShowBank = ({data,className,state,setState}) => {
    const [showBank, setShowBank] = useState(false);
    const handleClose = () => setShowBank(false);
  return (
    <div className={className} onClick={()=>setShowBank(true)}>
      <h1>{data.name}</h1>
      <p className= {`${data.status=="active" ? "bg-teal-800 ":"bg-red-500 " }text-white px-2 py-0.5 rounded-full text-xs text-center w-fit`}>{data.status} </p>
      <BankPopup showBank={showBank} handleClose={handleClose} data={data} state={state} setState={setState}/>
    </div>
  );
};

export default ShowBank;
