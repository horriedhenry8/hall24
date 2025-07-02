import { useNavigate } from "react-router-dom";
import CreateBtn from "../../../../components/ui/CreatBtn";
import Modal from "../../../../components/ui/Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ShowHallRentCat from "./ShowHallRentCat";
import CreateHallRentCat from "./CreateHallRentCat";

const HallRentCategory = () => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();

  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleClose = () => setShowCreateModal(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(baseurl + "hall-rent-categories", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error(errorData?.message || `HTTP error: ${response.status}`);
          error.status = response.status;
          throw error;
        }

        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          toast.error(error.message || "Failed to fetch hall rent categories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  return (
    <div>
      <CreateBtn onClick={() => setShowCreateModal(true)}>Create Hall Rent Category</CreateBtn>

      {/* Create Category Modal */}
      <Modal
        trigger={showCreateModal}
        triggerFn={handleClose}
        title="Create Hall Rent Category"
        description="Enter category details"
      >
        <CreateHallRentCat handleClose={handleClose} setState={setState} state={state} />
      </Modal>

      {/* Table container */}
      <div className="border rounded-lg border-gray-300 mt-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-teal-800 text-white px-4 py-2 rounded-t-lg">
          <h1>Category</h1>
          <h1>Status</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-teal-800" />
          </div>
        )}

        {/* No data */}
        {!loading && data.length === 0 && (
          <div className="flex justify-center items-center h-32 text-gray-500">
            No Hall Category available
          </div>
        )}

        {/* Data list */}
        {!loading && data.length > 0 && (
          <div>
            {data.map((item, index) => (
              <ShowHallRentCat
                key={item.id}
                className={`flex justify-between px-4 py-2 items-center border-t border-gray-300 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                } ${
                  index === data.length - 1 && "rounded-b-lg"
                } text-sm hover:bg-gray-300`}
                item={item}
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

export default HallRentCategory;
