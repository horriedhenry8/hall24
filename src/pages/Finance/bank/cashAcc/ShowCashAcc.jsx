import React, { useState } from "react";
import CashAccPopup from "./CashAccPopup";

const ShowCashAcc = ({data,className,state,setState}) => {
    const [showCashAcc, setShowCashAcc] = useState(false);
    const handleClose = () => setShowCashAcc(false);
  return (
    <div className={className} onClick={()=>setShowCashAcc(true)}>
        <h1>{data.name}</h1>
        <h1>{data.number}</h1>
        <h1>{data.opening_balance}</h1>
        <h1>{data.current_balance}</h1>
        <h1>{data.remarks}</h1>
      <p className={`${data.status === "active" ? "bg-teal-700" : "bg-red-500"} text-white px-1.5 rounded-lg w-fit`}>
  {data.status}
</p>
      <CashAccPopup showCashAcc={showCashAcc} handleClose={handleClose} id={data.id} state={state} setState={setState}/>
    </div>
  );
};

export default ShowCashAcc;