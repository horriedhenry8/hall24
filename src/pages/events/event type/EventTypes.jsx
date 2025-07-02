import CreateBtn from "../../../components/ui/CreatBtn";
import Modal from "../../../components/ui/Modal";
import { useEffect, useState } from "react";
import CreateEventTypes from "./CreateEventTypes";
import ShowEventTypes from "./ShowEventTypes";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const baseurl = import.meta.env.VITE_APP_BASE_URL;

const EventTypes = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(baseurl + "event-types", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event types:", error);
        toast.error(error.message || "Error fetching event types");
        setLoading(false);
      });
  }, [state]);

  return (
    <div>
      <CreateBtn onClick={() => setShowModal(true)}>Create Event Type</CreateBtn>

      <Modal
        trigger={showModal}
        triggerFn={handleClose}
        title="Create Event Type"
        description="Create a new event type"
      >
        <CreateEventTypes
          trigger={showModal}
          setState={setState}
          state={state}
          handleClose={handleClose}
        />
      </Modal>

      {/* Table */}
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="flex justify-between items-center bg-teal-800 text-white font-semibold px-4 py-2">
          <div>Name</div>
          <div>Status</div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-teal-800" />
          </div>
        )}

        {/* No data state */}
        {!loading && data?.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <h1 className="text-gray-500 font-semibold">No Event Types</h1>
          </div>
        )}

        {/* Error or data rows */}
        {!loading && data?.length > 0 && (
          <ShowEventTypes data={data} state={state} setState={setState} />
        )}
      </div>
    </div>
  );
};

export default EventTypes;
