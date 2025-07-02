import { useEffect, useState } from "react";
import CreateBtn from "../../../components/ui/CreatBtn";
import Modal from "../../../components/ui/Modal";
import CreateEventPricing from "./CreateEventPricing";
import ShowEventPricing from "./ShowEventPricing";
import { Loader } from "lucide-react";

const EventPricing = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(true);
  const [data, setData] = useState([]);
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  useEffect(() => {
    setLoading(true);
    fetch(baseurl + "event-pricings", {
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
        console.error("Error fetching event pricing:", error);
        setLoading(false);
      });
  }, [state]);
  console.log("eeeeee", data);

  return (
    <div>
      <CreateBtn onClick={() => setShowModal(true)}>
        Create Event Pricing
      </CreateBtn>
      <Modal
        trigger={showModal}
        triggerFn={handleClose}
        title="Create Event Pricing"
        description="Create Event Pricing"
      >
        <CreateEventPricing
          handleClose={handleClose}
          setState={setState}
          state={state}
        />
      </Modal>

      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Header row with custom widths */}
        <div
          className="grid text-white font-semibold bg-teal-800 px-4 py-3 text-sm"
          style={{
            gridTemplateColumns: "1.5fr 2fr 1fr 1fr 1fr 2fr", // custom widths
          }}
        >
          <div>Rent Category</div>
          <div>Event Type</div>
          <div>Hall Rent</div>
          <div>Administrative Charge</div>
          <div>Total Charge</div>
          <div>Remarks</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Loader className="animate-spin text-teal-800" />
          </div>
        )}

        {/* No data */}
        {!loading && data?.length === 0 && (
          <div className="flex justify-center items-center h-32 text-gray-500 font-semibold">
            No Event Pricing Found
          </div>
        )}

        {/* Error */}
        {!loading && data?.error && (
          <div className="flex justify-center items-center h-32 text-red-500 font-semibold">
            Error fetching data
          </div>
        )}

        {/* Data rows */}
        {!loading &&
          data?.length > 0 &&
          data.map((item, idx) => (
            <ShowEventPricing
              key={item.id}
              data={item}
              state={state}
              setState={setState}
              className={`grid items-center text-sm px-4 py-3 border-t border-gray-300 ${
                idx % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              } hover:bg-gray-300 cursor-pointer`}
              style={{
                gridTemplateColumns: "1.5fr 2fr 1fr 1fr 1fr 2fr", // match header
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default EventPricing;
