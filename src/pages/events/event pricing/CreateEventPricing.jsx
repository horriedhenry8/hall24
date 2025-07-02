import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEventPrising = ({ handleClose, setState, state }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [hallRentCat, setHallRentCat] = useState([]);
  const [hallRent, setHallRent] = useState();
  const [eventType, setEventType] = useState();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      hall_rent_category_id: NaN,
      event_type_id: NaN,
      hall_rent_id: NaN,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(baseurl + "event-pricings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
      toast.success(`${response.status} ${response.statusText}`);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setState(!state);
    }
  };
  const hall_rent_category_id = form.watch("hall_rent_category_id");

  const hallRentCatFn = useCallback(async () => {
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
      setHallRentCat(data.data);
      console.log(data.data);

      toast.success(`${response.status} ${response.statusText}`);
      // handle `data` if needed
    } catch (error) {
      console.error("Error fetching hall rent categories:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  const hallRentFn = useCallback(async () => {
    try {
      const response = await fetch(
        baseurl + "hall-rents/dropdown?category_id=" + hall_rent_category_id,
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
      console.log(data.data);

      toast.success(`${response.status} ${response.statusText}`);
      // handle `data` if needed
    } catch (error) {
      console.error("Error fetching hall rent categories:", error);
      toast.error("An unexpected error occurred.");
    }
  }, [hall_rent_category_id]);
  const eventTypeFn = async () => {
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
      toast.success(`${response.status} ${response.statusText}`);
    } catch (error) {
      console.error("Error fetching event types:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  useEffect(() => {
    hallRentCatFn();
    eventTypeFn();
  }, []);

  useEffect(() => {
    if (hall_rent_category_id) {
      hallRentFn();
    }
  }, [hall_rent_category_id]);

  // if (loading) {
  //   return <Loader className="animate-spin text-teal-800" />;
  // }
  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
          <Loader className="animate-spin text-teal-800 h-10 w-10" />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg border border-teal-200 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-teal-800 mb-2">
          Create Event Pricing
        </h2>

        {/* Hall Rent Category */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="hall_rent_category_id"
            className="font-medium text-teal-700"
          >
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
            {hallRentCat.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.hall_rent_category_id && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Event Type */}
        <div className="flex flex-col gap-1">
          <label htmlFor="event_type_id" className="font-medium text-teal-700">
            Event Type
          </label>
          <select
            id="event_type_id"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("event_type_id", { required: true })}
          >
            <option value={NaN} disabled selected hidden>
              Select an Event Type
            </option>
            {eventType?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.event_type_id && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Hall Rent */}
        <div className="flex flex-col gap-1">
          <label htmlFor="hall_rent_id" className="font-medium text-teal-700">
            Hall Rent
          </label>
          <select
            id="hall_rent_id"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("hall_rent_id", { required: true })}
          >
            <option value={NaN} disabled selected hidden>
              Select a Hall Rent
            </option>
            {hallRent?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.hall_rent_id && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEventPrising;
