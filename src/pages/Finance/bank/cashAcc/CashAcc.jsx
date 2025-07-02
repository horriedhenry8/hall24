import { useEffect, useState } from "react";
import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";
import CreateCashAcc from "./CreateCashAcc";
import ShowCashAcc from "./ShowCashAcc";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const baseurl = import.meta.env.VITE_APP_BASE_URL;


const CashAcc = () => {
  const [showCreateCashAcc, setShowCreateCashAcc] = useState(false);
      const[loading,setLoading] = useState(false);
  

  // state to refresh the page
  const [state,setState]=useState(true)
  
  // fetch CashAcc data
  const [data,setData]=useState();
  useEffect(() => {
    setLoading(true);
    fetch(baseurl + "cash-accounts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:"bearer " + localStorage.getItem("token"),
      },
    })
    .then((d)=>d.json())
    .then((a)=>{setData(a.data);setLoading(false);})
    .catch((error) => {
      console.error("Error fetching data:", error);
      toast.error(error.massage || "Error fetching data");
      setLoading(false);
    });
  }, [state]);
  console.log(data)
   const handleClose = () => {
    setShowCreateCashAcc(false);
   }
   return (
    <div>
      <CreateBtn onClick={() => setShowCreateCashAcc(true)}>Create Cash Account</CreateBtn>
  
      {/* popup to create CashAcc */}
      <Modal trigger={showCreateCashAcc} triggerFn={handleClose} title="Create Cash Account" description="Create a new CashAcc">
        <CreateCashAcc state={state} setState={setState} handleClose={handleClose} />
      </Modal>
  
      {/* display CashAccs (name + status) */}
      <div className="border border-gray-300  rounded-lg">
        {/* Table header */}
        <div className="grid grid-cols-6 bg-teal-800 rounded-t-lg text-white font-semibold px-4 py-2">
          <div>Name</div>
          <div>Number</div>
          <div>Openning Balance</div>
          <div>Current Balance</div>
          <div>Remarks</div>
          <div>Status</div>
        </div>
  
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-teal-800"/>
          </div>
        )}

        {/* No data state */}
        {data != undefined && data.length === 0 && !loading && (
          <div className="flex justify-center items-center h-32">
            <h1 className="text-gray-500 text-lg">No Cash Account Found</h1>
          </div>
        )}
  
        {/* Error state */}
        {data === undefined && !loading && (
          <div className="flex justify-center items-center h-32">
            <h1 className="text-gray-500 text-lg">Error fetching data</h1>
          </div>
        )}
  
        {/* Empty state */}
        {data != undefined && data.length > 0 && !loading && data.error && (
          <div className="flex justify-center items-center h-32">
            <h1 className="text-gray-500 text-lg">Error fetching data</h1>
          </div>
        )}

        {/* Data rows */}
        {data != undefined &&
          data?.map((item, id) => (
            <ShowCashAcc
              key={item.id}
              data={item}
              state={state}
              setState={setState}
              className={`grid grid-cols-6 items-center text-sm border-t border-gray-300 ${
                id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              } ${data.length - 1 == id && "rounded-b-lg"} hover:bg-gray-300 px-4 py-2 cursor-pointer`}
            />
          ))}
      </div>
    </div>
  );
  
  
  
};

export default CashAcc;