import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateHallRentCat = ({ handleClose, setState, state }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      status: "active",
      remarks: "", // default value for optional field
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(baseurl + "hall-rent-categories", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to create category");
      }

      toast.success(result.message || "Category created successfully");
      setState(!state);
      reset();
      handleClose();
    } catch (error) {
      toast.error(error.message || "Error creating category");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-700 focus:border-teal-700"
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-700 focus:border-teal-700"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-700 focus:border-teal-700"
          placeholder="Optional remarks..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition-all"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateHallRentCat;
