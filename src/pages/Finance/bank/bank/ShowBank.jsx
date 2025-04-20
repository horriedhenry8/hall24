import React, { useState } from "react";
import BankPopup from "./BankPopup";

const ShowBank = ({data,className,state,setState}) => {
    const [showBank, setShowBank] = useState(false);
    const handleClose = () => setShowBank(false);
  return (
    <div className={className} onClick={()=>setShowBank(true)}>
      <h1>{data.name}</h1>
      <p className= {`${data.status=="active" ? "bg-green-500 ":"bg-red-500 " }text-white px-1.5 rounded-lg`}>{data.status} </p>
      <BankPopup showBank={showBank} handleClose={handleClose} data={data} state={state} setState={setState}/>
    </div>
  );
};

export default ShowBank;
