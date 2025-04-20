import { useEffect, useState } from "react";
import CreateBank from "./CreateBank";
import ShowBank from "./ShowBank";
import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";

const baseurl = import.meta.env.VITE_APP_BASE_URL;


const Bank = () => {
  const [showCreateBank, setShowCreateBank] = useState(false);

  // state to refresh the page
  const [state,setState]=useState(true)
  
  // fetch bank data
  const [data,setData]=useState();
  useEffect(() => {
    fetch(baseurl + "banks", {
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
   const handleClose = () => {
    setShowCreateBank(false);
   }
    return (
        <div>
          <CreateBtn  onClick={()=> setShowCreateBank(true)} >Create bank</CreateBtn>

          {/* popup to create bank */}
          <Modal trigger={showCreateBank} triggerFn={handleClose} title="Create Bank" description="Create a new bank" ><CreateBank state={state} setState={setState} handleClose={handleClose}/> </Modal>

          {/* display banks(name + status) */}
          <div className="border border-gray-300 my-4">
          <div className="flex justify-between px-4 py-1 bg-green-500 text-white">
            <h1 className="">Bank Name</h1>
            <h1 className="">Status</h1>
          </div>
          {
            data!=undefined && data?.map((data)=>(
              <ShowBank state={state} setState={setState} key={data.id} data={data} className={`flex justify-between border border-gray-300 ${data.id%2===0?"bg-gray-100":"bg-gray-200"} hover:bg-gray-300 px-4 py-1 w-full`}/>
            ))
          }           
          </div>
        </div>
    );
};

export default Bank;