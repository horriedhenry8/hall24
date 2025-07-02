import React, { useEffect, useState } from "react";
import Close from "../../../../components/icons/Close";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import DeleteModal from "../../../../components/ui/DeleteModal";
import Modal from "../../../../components/ui/Modal";

const BankAccPopup = ({ showBankAcc, handleClose, id, state, setState }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const handleDelete = () => {
    setDeleteModal(false);
    deletFn();
  };

  // Form handling
  const form = useForm({
    defaultValues: {
      branch_name: "",
      account_number: "",
      opening_balance: "",
      current_balance: "",
      status: "active",
      _method: "put",
      bank_id: "",
      remarks: "",
    },
  });
  const { register, handleSubmit, reset, getValues } = form;

  // State for banks and account data
  const [bank, setBank] = useState([]);

  const fetchbank = React.useCallback(async () => {
    if (showBankAcc) {
      const response = await fetch(`${baseurl}banks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch banks");
      }

      setBank(result.data);
      console.log(bank);
    }
  }, [showBankAcc, baseurl]);

  const fetchBankWithId = React.useCallback(
    async (id) => {
      if (id && showBankAcc) {
        fetch(`${baseurl}bank-accounts/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((d) => d.json())
          .then((a) => {
            reset({
              account_number: a.data.account_number || "",
              branch_name: a.data.branch_name || "",
              opening_balance: a.data.opening_balance || "",
              current_balance: a.data.current_balance || "",
              status: a.data.status || "active",
              _method: "put",
              bank_id: a.data.bank.id || "",
              bank_name: a.data.bank.name || "",
              remarks: "testing",
            });
          })
          .catch((error) => toast.error(error.message));
      }
    },
    [baseurl, reset, showBankAcc],
  );

  // Fetch banks
  useEffect(() => {
    const call = async () => {
      setLoading(true);
      try {
        const promises = [fetchbank()];
        if (id) {
          promises.push(fetchBankWithId(id));
        }
        await Promise.all(promises);
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    call();
  }, [fetchBankWithId, fetchbank, id]);

  // Submit form data
  const submitFn = async (data) => {
    const url = `${baseurl}bank-accounts/${id}`;
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
      if (!response.ok) {
        throw new Error(result.message);
      }
      setState(!state);
      toast.success(result.message);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete bank account
  const deletFn = async () => {
    try {
      await fetch(`${baseurl}bank-accounts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  const val = [
    "account_number",
    "branch_name",
    "opening_balance",
    "current_balance",
  ];

  return (
    <div
      className={`${showBankAcc ? "fixed inset-0 z-50 flex items-center justify-center bg-black/40" : "hidden"}`}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <Close />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Bank Account
        </h2>

        {loading && (
          <div className="fixeed transition-all inset-0 z-50 flex items-center justify-center">
            <svg
              className="animate-ping h-10 w-10 text-teal-800"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="squre"
              strokeLinejoin="squre"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0"
                stroke="currentColor"
                strokeWidth="4"
              ></path>
            </svg>
          </div>
        )}
        <Modal
          trigger={deleteModal}
          triggerFn={handleDeleteModal}
          title={`Delete Bank Account ${getValues("account_number")} of ${getValues("bank_name")}`}
          description="Are you sure you want to delete this cash account?"
        >
          <DeleteModal deleteFn={handleDelete} cancelFn={handleDeleteModal} />
        </Modal>
        <form onSubmit={handleSubmit(submitFn)}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Bank
              </label>
              <select
                {...register("bank_id")}
                value={form?.watch("bank_id")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {bank?.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            {val.map((item, index) => (
              <div key={index}>
                <label
                  className="block text-sm font-medium text-gray-700 capitalize"
                  htmlFor={item}
                >
                  {item.replace("_", " ")}
                </label>
                <input
                  id={item}
                  type="text"
                  {...register(item)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            ))}

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={handleDeleteModal}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
            >
              Delete
            </button>

            <button
              type="submit"
              className="bg-teal-800 hover:bg-teal-700 text-white py-2 px-6 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccPopup;
