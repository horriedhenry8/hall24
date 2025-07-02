import { useEffect, useState } from "react";
import CreateBtn from "../../../../components/ui/CreatBtn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ShowHallRent from "./ShowHallRent";
import CreateHallRent from "./CreateHallRent"; // assuming this is like CreateBankAcc
import Modal from "../../../../components/ui/Modal";

const baseurl = import.meta.env.VITE_APP_BASE_URL;

const HallRent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showCreateHall, setShowCreateHall] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseurl + "hall-rents", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching hall rents:", error);
        if (error.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          toast.error(error.message || "Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, navigate]);

  return (
    <div>
      {/* Create Button */}
        <CreateBtn onClick={() => setShowCreateHall(true)}>Create Hall Rent</CreateBtn>

      {/* Create Popup */}
      {showCreateHall && (
  <Modal trigger={showCreateHall} triggerFn={() => setShowCreateHall(false)} title={"Create Hall Rent" } description={"Create Hall Rent"}>
    <CreateHallRent handleClose={() => setShowCreateHall(false)} setState={setState} state={state} />
  </Modal>
)}


      {/* Table */}
      <div className="border rounded-lg border-gray-300 mt-2">
        {/* Header */}
        <div className="grid grid-cols-4 bg-teal-800 text-white px-4 py-2 rounded-t-lg">
          <h1>Category</h1>
          <h1>Hall Rent</h1>
          <h1>Administrative Charge</h1>
          <h1>Total Charge</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-teal-800" />
          </div>
        )}

        {/* No Data */}
        {!loading && data.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">No Hall available</p>
          </div>
        )}

        {/* Data Rows */}
        {!loading && data.length > 0 && (
          <div>
            {data.map((item, index) => (
              <ShowHallRent
                key={item.id}
                item={item}
                className={`grid grid-cols-4 px-4 py-2 items-center border-t border-gray-300 text-sm hover:bg-gray-300 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                } ${index === data.length - 1 ? "rounded-b-lg" : ""}`}
                state={state}
                setState={setState}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HallRent;
