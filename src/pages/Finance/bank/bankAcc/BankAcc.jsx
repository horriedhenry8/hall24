import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";

import { useEffect, useState } from "react";
import CreateBankAcc from "./CreateBankAcc";
import ShowBankAcc from "./ShowBankAcc";
import BankAccPopup from "./BankAccPopup";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
const baseurl = import.meta.env.VITE_APP_BASE_URL;

const BankAcc = () => {
  const [showBankAcc, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);

  // state to refresh the page
  const [state, setState] = useState(true);

  // fetch bank account data
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(baseurl + "bank-accounts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((d) => d.json())
      .then((a) => {setData(a.data);setLoading(false);})
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(error.massage || "Error fetching data");
        setLoading(false);
      });
  }, [state]);
  console.log(data);

  return (
    <div>
      <CreateBtn onClick={() => setShow(!showBankAcc)}>
        Create Bank Account
      </CreateBtn>
      <Modal
        trigger={showBankAcc}
        triggerFn={handleClose}
        title="Create Bank Account"
        description="Create a new bank account"
      >
        <CreateBankAcc
          trigger={showBankAcc}
          setState={setState}
          state={state}
          handleClose={handleClose}
        />
      </Modal>
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-6 bg-teal-800 text-white font-semibold px-4 py-2">
          <div>Branch</div>
          <div>Status</div>
          <div>Account No.</div>
          <div>Bank</div>
          <div>Opening Balance</div>
          <div>Current Balance</div>
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
            <h1 className="text-gray-500 font-semibold">No Bank Account</h1>
          </div>
        )}

        {/* Error state */}
        {data != undefined && data.length > 0 && !loading && data.error && (
          <div className="flex justify-center items-center h-32">
            <h1 className="text-red-500 font-semibold">{data.error}</h1>
          </div>
        )}

        {/* Data rows */}
        {data != undefined &&
          data?.map((data, id) => (
            <ShowBankAcc
              key={data.id}
              data={data}
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

export default BankAcc;