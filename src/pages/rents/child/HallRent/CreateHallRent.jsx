import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const baseurl = import.meta.env.VITE_APP_BASE_URL;

const CreateHallRent = ({ handleClose, state, setState }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const form = useForm({
    defaultValues: {
      hall_rent: null,
      administrative_charge: null,
      total_charge: null,
      remarks: "",
      hall_rent_category_id: null,
    },
  });

  const { register, handleSubmit, reset, control, setValue } = form;

  const hallRent = useWatch({ control, name: "hall_rent" });
  const adminCharge = useWatch({ control, name: "administrative_charge" });

  useEffect(() => {
    const rent = parseFloat(hallRent) || 0;
    const charge = parseFloat(adminCharge) || 0;
    const total = rent + charge;
    setValue("total_charge", total.toFixed(2));
  }, [hallRent, adminCharge, setValue]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseurl}hall-rent-categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories");
      }

      setCategories(result.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseurl}hall-rents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          hall_rent: Number(data.hall_rent),
          administrative_charge: Number(data.administrative_charge),
          total_charge: Number(data.total_charge),
          remarks: data.remarks,
          hall_rent_category_id: Number(data.hall_rent_category_id),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Hall Rent created successfully!");
      reset();
      setState(!state);
      handleClose();
    } catch (error) {
      toast.error(error.message || "Error creating hall rent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-teal-800">Create Hall Rent</h2>

      {loading && (
        <div className="flex justify-center mb-4">
          <Loader2 className="animate-spin text-teal-700" />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rent</label>
          <input
            type="number"
            {...register("hall_rent", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Administrative Charge</label>
          <input
            type="number"
            {...register("administrative_charge", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Total Charge</label>
          <input
            type="number"
            {...register("total_charge")}
            readOnly
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <input
            type="text"
            {...register("remarks")}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("hall_rent_category_id", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-teal-800 hover:bg-teal-700 text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHallRent;
