import React, { useState } from "react";
import BankAccPopup from "./BankAccPopup";

const ShowBankAcc = ({data,className,state,setState}) => {
    const [showBankAcc, setShowBankAcc] = useState(false);
    const handleClose = () => setShowBankAcc(false);
  return (
    <div className={className} onClick={()=>setShowBankAcc(true)}>
      <h1>{data.branch_name}</h1>
      <p className= {`${data.status=="active" ? "bg-green-500 ":"bg-red-500 " }text-white px-1.5 rounded-lg`}>{data.status} </p>
        <h1>{data.account_number}</h1>
        <h1>{data.opening_balance}</h1>
        <h1>{data.current_balance}</h1>
      <BankAccPopup showBankAcc={showBankAcc} handleClose={handleClose} data={data} state={state} setState={setState}/>
    </div>
  );
};

export default ShowBankAcc;
