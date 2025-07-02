import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../../../components/ui/Input';
import { Loader2 } from 'lucide-react';

const CreateCashAcc = ({handleClose,state,setState}) => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const[loading,setLoading] = useState(false);

    // form to add cash account
    const form = useForm();
    const { register, handleSubmit } = form;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
          const response = await fetch(baseUrl + "cash-accounts", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Failed to submit cash account");
          }
      
          setState(!state);
          handleClose();
        } catch (error) {
          toast.error(error.message || "An unexpected error occurred");
        }
        finally{
          setLoading(false);
        }
      };

      if(loading){
        return (
          <Loader2 className='animate-spin'/>
        );
      }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
            label="Name"
            htmlFor="name"
            reg={register("name", { required: true })}
            inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
            placeholder="Name"
            isrequired={true}
        />



        <Input
          label="Number"
          htmlFor="number"
          reg={register("number", { required: true })}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Number"
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

        <Input
          label="Remarks"
          htmlFor="remarks"
          reg={register("remarks")}
          inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="text"
          placeholder="Remarks"
        />

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

export default CreateCashAcc;