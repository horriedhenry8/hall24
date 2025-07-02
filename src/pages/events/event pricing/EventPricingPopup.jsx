import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import { Loader } from "lucide-react";
import { useCallback } from "react";

const EventPricingPopup = ({ state, setState, showPopup, handleClose, id }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState();
  const [hallRentCategory, setHallRentCategory] = useState();
  const [hallRent, setHallRent] = useState();
  const [eventType, setEventType] = useState();
  const handleDeleteModal = () => setDeleteModal(!deleteModal);
  const handleDelete = () => {
    setDeleteModal(false);
    deletFn();
  };

  const form = useForm({
    defaultValues: {
      hall_rent_category_id: NaN,
      event_type_id: NaN,
      hall_rent_id: NaN,
      _method: "put",
    },
  });

  const { register, handleSubmit, reset, getValues } = form;

  const fetchEventPricing = useCallback(async () => {
    if (id && showPopup) {
      try {
        const res = await fetch(`${baseurl}event-pricings/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        reset({
          hall_rent_category_id: result.data.hall_rent_category_id || "",
          event_type_id: result.data.event_type_id || "",
          hall_rent_id: result.data.hall_rent_id || "",
          _method: "put",
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  }, [baseurl, id, reset, showPopup]);

  useEffect(() => {
    if (showPopup) {
      setLoading(true);
      fetchEventPricing().finally(() => setLoading(false));
    }
  }, [fetchEventPricing, showPopup]);

  const hallRentCatId = form.watch("hall_rent_category_id");
  const hallRentCatFn = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseurl + "hall-rent-categories/dropdown", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setHallRentCategory(data.data);
    } catch (error) {
      console.error("Error fetching hall rent categories:", error);
      toast.error("An unexpected error occurred.", error);
    } finally {
      setLoading(false);
    }
  };
  const hallRentFn = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        baseurl + "hall-rents/dropdown?category_id=" + hallRentCatId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        },
      );
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setHallRent(data.data);
    } catch (err) {
      toast.error("eroor ", err);
    } finally {
      setLoading(false);
    }
  };
  const eventTypeFn = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseurl + "event-types/dropdown", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setEventType(data.data);
    } catch (err) {
      toast.error("eroor ", err);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   hallRentCatFn();
  //   eventTypeFn();
  // }, []);

  // useEffect(() => {
  //   hallRentFn();
  // }, [hallRentCatId]);

  const submitFn = async (data) => {
    const url = `${baseurl}event-pricings/${id}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      toast.success(result.message);
      setState(!state);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletFn = async () => {
    try {
      const res = await fetch(`${baseurl}event-pricings/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Delete failed");
      }

      toast.success("Event Type deleted successfully");
      setState(!state);
      handleClose();
    } catch (err) {
      toast.error(err.message);
    }
  };
  console.log(data, "siuuuuu");
  return (
    <Modal
      triggerFn={handleClose}
      trigger={showPopup}
      title={"data.data.event_type.name"}
      description={"penaldo"}
    >
      <div className="p-4">
        {loading && (
          <div className="fixed top-1/2 left-1/2 ">
            <Loader className="animate-spin h-6 w-6 text-teal-800" />
          </div>
        )}
        <Form onSubmit={handleSubmit(submitFn)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hall Rent Category
            </label>
            <select
              id="hall_rent_category_id"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("hall_rent_category_id", { required: true })}
            >
              <option value={NaN} disabled selected hidden>
                Select a category
              </option>
              {hallRentCategory?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EventPricingPopup;
