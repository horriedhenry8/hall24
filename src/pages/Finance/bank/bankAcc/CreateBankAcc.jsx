import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../../../components/ui/Input";

const CreateBankAcc = ({ setState, state , handleClose , trigger}) => {
  const form = useForm({
    defaultValues: {
      status: "active",
    },
  });

  const { register, handleSubmit , reset} = form;

  const submit = async (val) => {
    const { ...restData } = val;
    const data = { ...restData }; 
    const url = import.meta.env.VITE_APP_BASE_URL + "bank-accounts";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      else {
        toast.success(result.message);
        handleClose();
        setState(!state);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    if(trigger) {fetch(import.meta.env.VITE_APP_BASE_URL + "banks", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((d) => d.json())
      .then((a) => setBanks(a.data || []));}
  }, [trigger]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register("bank_id")}
            required
          >
            <option value="">Select Bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Account Number"
          htmlFor="account_number"
          reg={register("account_number", { required: true })}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Account Number"
          isrequired={true}
        />

        <Input
          label="Branch Name"
          htmlFor="branch_name"
          reg={register("branch_name", { required: true })}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Branch Name"
          isrequired={true}
        />

        <Input
          label="Opening Balance"
          htmlFor="opening_balance"
          reg={register("opening_balance", { required: true })}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Opening Balance"
          isrequired={true}
        />

        <Input
          label="Current Balance"
          htmlFor="current_balance"
          reg={register("current_balance", { required: true })}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Current Balance"
          isrequired={true}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register("status")}
            defaultValue="active"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBankAcc;
