import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../../../components/ui/Modal";
import DeleteModal from "../../../components/ui/DeleteModal";
import { Loader } from "lucide-react";

const EventTypesPopup = ({ showPopup, handleClose, id, state, setState }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);
  const handleDelete = () => {
    setDeleteModal(false);
    deletFn();
  };

  const form = useForm({
    defaultValues: {
      name: "",
      remarks: "",
      status: "active",
      bride_groom: "",
      _method: "put",
    },
  });

  const { register, handleSubmit, reset, getValues } = form;

  const fetchEventType = useCallback(async () => {
    if (id && showPopup) {
      try {
        const res = await fetch(`${baseurl}event-types/${id}`, {
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
          name: result.data.name || "",
          remarks: result.data.remarks || "",
          status: result.data.status || "active",
          bride_groom: result.data.bride_groom || "",
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
      fetchEventType().finally(() => setLoading(false));
    }
  }, [fetchEventType, showPopup]);

  const submitFn = async (data) => {
    const url = `${baseurl}event-types/${id}`;
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
      const res = await fetch(`${baseurl}event-types/${id}`, {
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

  return (
    <Modal
      trigger={showPopup}
      triggerFn={handleClose}
      closeOnOutsideClick={true}
      title={`Update Event Type`}
    >
      <div className="p-4">
        {loading && (
          <div className="fixed top-1/2 left-1/2">
            <Loader className="animate-spin h-6 w-6 text-teal-800" />
          </div>
        )}
        <form onSubmit={handleSubmit(submitFn)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <input
              type="text"
              {...register("remarks")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="bride_groom"
              type="checkbox"
              {...register("bride_groom")}
              value="1"
              onChange={(e) =>
                form.setValue("bride_groom", e.target.checked ? "1" : "0")
              }
              checked={form.watch("bride_groom") === "1"}
              className="h-4 w-4 accent-teal-800 border-gray-300 rounded"
            />
            <label htmlFor="bride_groom" className="text-sm text-gray-700">
              Bride Groom
            </label>
          </div>
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleDeleteModal}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Delete
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-800 hover:bg-teal-700 text-white py-2 px-6 rounded"
            >
              Update
            </button>
          </div>
        </form>

        <Modal
          trigger={deleteModal}
          triggerFn={handleDeleteModal}
          title={`Delete Event Type "${getValues("name")}"`}
          description="Are you sure you want to delete this event type?"
        >
          <DeleteModal deleteFn={handleDelete} cancelFn={handleDeleteModal} />
        </Modal>
      </div>
    </Modal>
  );
};

export default EventTypesPopup;
