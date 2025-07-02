import { useEffect, useState } from "react";
import CreateBank from "./CreateBank";
import ShowBank from "./ShowBank";
import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const baseurl = import.meta.env.VITE_APP_BASE_URL;

const Bank = () => {
  const [showCreateBank, setShowCreateBank] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // state to refresh the page
  const [state, setState] = useState(true);

  // fetch bank data
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseurl + "banks", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error(
            errorData?.message || `HTTP error! status: ${response.status}`
          );
          error.status = response.status; // Attach status
          error.details = errorData; // Optional: attach full error response
          throw error;
        }

        const data = await response.json();
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);

        if (error.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error fetching data:", error);
          toast.error(error.message || "Error fetching data");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, state]);
  console.log(data);
  const handleClose = () => {
    setShowCreateBank(false);
  };
  return (
    <div>
      <CreateBtn onClick={() => setShowCreateBank(true)}>Create bank</CreateBtn>

      {/* popup to create bank */}
      <Modal
        trigger={showCreateBank}
        triggerFn={handleClose}
        title="Create Bank"
        description="Create a new bank"
      >
        <CreateBank
          state={state}
          setState={setState}
          handleClose={handleClose}
        />
      </Modal>

      {/* display banks (name + status) */}
      <div className="border border-gray-300  rounded-lg">
        {/* Table header */}
        <div className="grid grid-cols-2 bg-teal-800 text-white font-semibold px-4 py-2 rounded-t-lg ">
          <h1 className="text-left">Bank Name</h1>
          <h1 className="text-left ml-auto">Status</h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-4 h-32">
            <Loader2 className="animate-spin text-teal-800" />
          </div>
        )}

        {/* No data state */}
        {data != undefined && data.length === 0 && !loading && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">No bank available</p>
          </div>
        )}

        {/* Data rows */}
        {data != undefined &&
          data?.map((item, id) => (
            <ShowBank
              key={item.id}
              data={item}
              state={state}
              setState={setState}
              className={`flex justify-between items-center text-sm border-t border-gray-300 ${
                id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              } ${data.length - 1 == id && "rounded-b-lg"} hover:bg-gray-300 px-4 py-2 cursor-pointer`}
            />
          ))}
      </div>
    </div>
  );
};

export default Bank;
