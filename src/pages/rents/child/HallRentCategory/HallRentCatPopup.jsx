import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../../../../components/ui/Modal";
import DeleteModal from "../../../../components/ui/DeleteModal";
import Close from "../../../../components/icons/Close";
import { Loader2 } from "lucide-react";

const HallRentCatPopup = ({ show, handleClose, id, state, setState }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      name: "",
      status: "active",
      remarks: "",
      _method: "put",
    },
  });

  const handleDeleteModal = () => setDeleteModal(!deleteModal);
  const confirmDelete = () => {
    setDeleteModal(false);
    deleteFn();
  };

  useEffect(() => {
    if (id && show) {
      setLoading(true);
      fetch(`${baseurl}hall-rent-categories/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          reset({
            ...data.data,
            remarks: data.data?.remarks || "",
            _method: "put",
          });
        })
        .catch((err) => {
          toast.error(err.message || "Failed to fetch data");
        })
        .finally(() => setLoading(false));
    }
  }, [id, show]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${baseurl}hall-rent-categories/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(result.message);
      setState(!state);
      handleClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteFn = async () => {
    try {
      await fetch(`${baseurl}hall-rent-categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Deleted successfully");
      setState(!state);
      handleClose();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <div className={`${show ? "fixed inset-0 z-50 flex items-center justify-center bg-black/40" : "hidden"}`}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8 relative animate-fadeIn">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-600 text-xl">
          <Close />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">Update Hall Rent Category</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-teal-800" />
          </div>
        ) : (
          <>
            <Modal
              trigger={deleteModal}
              triggerFn={handleDeleteModal}
              title={`Delete ${getValues("name")}`}
              description="Are you sure you want to delete this Hall Rent Category?"
            >
              <DeleteModal deleteFn={confirmDelete} cancelFn={handleDeleteModal} />
            </Modal>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register("name")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register("status")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  {...register("remarks")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  placeholder="Optional remarks..."
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={handleDeleteModal}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-700 text-white px-5 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default HallRentCatPopup;
