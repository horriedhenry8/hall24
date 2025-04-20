import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";

import { useEffect, useState } from "react";
import CreateBankAcc from "./CreateBankAcc";
import ShowBankAcc from "./ShowBankAcc";
import BankAccPopup from "./BankAccPopup";
const baseurl = import.meta.env.VITE_APP_BASE_URL;


const BankAcc = () => {
    const[showBankAcc,setShow]= useState(false);
    const handleClose = () => setShow(false);
    
      // state to refresh the page
      const [state,setState]=useState(true)
      
      // fetch bank data
      const [data,setData]=useState();
      useEffect(() => {
        fetch(baseurl + "bank-accounts", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:"bearer " + localStorage.getItem("token"),
          },
        })
        .then((d)=>d.json())
        .then((a)=>setData(a.data))
      }, [state]);
      console.log(data)
    
    return (
        <div>
            <CreateBtn onClick={()=>setShow(!showBankAcc)}>Create Bank Account</CreateBtn>
            <Modal trigger={showBankAcc} triggerFn={handleClose} title="Create Bank Account" description="Create a new bank account" ><CreateBankAcc setState={setState} state={state}/></Modal>   
            {
            data!=undefined && data?.map((data)=>(
              <ShowBankAcc state={state} setState={setState} key={data.id} data={data} className={`flex justify-between border border-gray-300 ${data.id%2===0?"bg-gray-100":"bg-gray-200"} hover:bg-gray-300 px-4 py-1 w-full`}/>
            ))
          }  
          <BankAccPopup/>       
        </div>
    );
};

export default BankAcc;