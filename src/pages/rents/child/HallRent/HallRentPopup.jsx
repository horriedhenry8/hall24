import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Modal from "../../../../components/ui/Modal";
import DeleteModal from "../../../../components/ui/DeleteModal";

const baseurl = import.meta.env.VITE_APP_BASE_URL;

const HallRentPopup = ({ handleClose, showHallRent, id, state, setState, setShowHallRent }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const form = useForm({
    defaultValues: {
      hall_rent: '',
      administrative_charge: '',
      total_charge: '',
      remarks: '',
      hall_rent_category_id: '',
      _method: 'put',
    },
  });

  const { register, handleSubmit, reset, setValue, getValues, control} = form;

  const hallRent = useWatch({ control, name: 'hall_rent' });
  const adminCharge = useWatch({ control, name: 'administrative_charge' });

  useEffect(() => {
    const rent = parseFloat(hallRent) || 0;
    const charge = parseFloat(adminCharge) || 0;
    const total = rent + charge;
    setValue('total_charge', total.toFixed(2));
  }, [hallRent, adminCharge, setValue]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseurl}hall-rent-categories`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: 'application/json',
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setCategories(result.data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const fetchHallRentById = async () => {
    try {
      const res = await fetch(`${baseurl}hall-rents/${id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: 'application/json',
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      reset({
        hall_rent: result.data.hall_rent,
        administrative_charge: result.data.administrative_charge,
        total_charge: result.data.total_charge,
        remarks: result.data.remarks || '',
        hall_rent_category_id: result.data.hall_rent_category?.id ,
        _method: 'put',
      });
    } catch (err) {
      toast.error(err.message);
    }
  } ;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCategories(), fetchHallRentById()]);
      } catch (err) {
        toast.error(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    if(showHallRent){
    init();}
  }, [showHallRent]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${baseurl}hall-rents/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          ...data,
          hall_rent: Number(data.hall_rent),
          administrative_charge: Number(data.administrative_charge),
          total_charge: Number(data.total_charge),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(result.message);
      setState(!state);
      handleClose();
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    setDeleteModal(false);
    try {
      const res = await fetch(`${baseurl}hall-rents/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: 'application/json',
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success('Hall Rent deleted');
      setState(!state);
      handleClose();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <>
      <Modal trigger={showHallRent} triggerFn={()=>setShowHallRent(false)} title="Update Hall Rent" description="Update the hall rent details">
        <div className="p-6 max-w-xl mx-auto">

            {loading && (
              <div className="flex justify-center">
                <Loader2 className="animate-spin text-teal-800" />
              </div>
            )}
          {!loading && <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Rent</label>
              <input
                type="number"
                {...register("hall_rent", { required: true })}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Administrative Charge</label>
              <input
                type="number"
                {...register("administrative_charge", { required: true })}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Total Charge</label>
              <input
                type="number"
                readOnly
                {...register("total_charge")}
                className="mt-1 w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Remarks</label>
              <input
                type="text"
                {...register("remarks")}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                {...register("hall_rent_category_id", { required: true })}
                className="mt-1 w-full border rounded px-3 py-2"
                value={form?.watch("hall_rent_category_id")}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setDeleteModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
              >
                Delete
              </button>

              <button
                type="submit"
                className="bg-teal-800 hover:bg-teal-700 text-white px-5 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>}
        </div>
      </Modal>

      <Modal
        trigger={deleteModal}
        triggerFn={() => setDeleteModal(false)}
        title={`Delete Hall Rent ₹${getValues("hall_rent") || 0}`}
        description="Are you sure you want to delete this hall rent?"
      >
        <DeleteModal deleteFn={handleDelete} cancelFn={() => setDeleteModal(false)} />
      </Modal>
    </>
  );
};

export default HallRentPopup;
