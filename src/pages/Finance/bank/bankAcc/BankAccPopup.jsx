import React, { useEffect, useState } from 'react';
import Close from '../../../../components/icons/Close';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const BankAccPopup = ({ showBankAcc, handleClose, data ,state,setState}) => {
    const baseurl = import.meta.env.VITE_APP_BASE_URL;
    const [dataa, setData] = useState({});
    useEffect(() => {
        if (data?.id) {
            fetch(baseurl + "bank-accounts/" + data.id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "bearer " + localStorage.getItem("token"),
                },
            })
                .then((d) => d.json())
                .then((a) => {
                    setData(a.data);
                    console.log(a.data);
                    console.log(dataa);
                    setValue("account_number", a.data.account_number);
                    setValue("branch_name", a.data.branch_name);
                    setValue("opening_balance", a.data.opening_balance);
                    setValue("current_balance", a.data.current_balance);
                    setValue("status", a.data.status);
                    
                })
                .catch((error) => toast.error(error));
        }
    },[data]);

     const form = useForm({defaultValues: {
        branch_name: "",
        account_number: "",
        opening_balance: "",
        current_balance: "",
        status: "active",
        }});
      const {
        setValue,
        register,
        handleSubmit,
        reset
        
      } = form;

      useEffect(() => {
        if (dataa?.account_number) {
            reset({
                account_number: dataa.account_number || "",
                branch_name: dataa.branch_name || "",
                opening_balance: dataa.opening_balance || "",
                current_balance: dataa.current_balance || "",
                status: dataa.status || "active",
            });
        }}, [dataa]);

        const submitFn = async (data) => {
            console.log(data);
            const url = import.meta.env.VITE_APP_BASE_URL + "bank-accounts/" + data.id;
            console.log("URL:", url);
            try {
                const response = await fetch(url, {
                    method: "PUT",
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
                console.log(result);
                setState(!state);
                toast.success(result.message);
            } catch (error) {
                toast.error(error.message);
            }
        }

    const deletFn = async () => {
        await fetch(baseurl + "bank-accounts/" + data.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then(setState(!state))
        .catch((error) => console.log(error));
      };

    const val=[ "account_number", "branch_name", "opening_balance", "current_balance"]

    return (
        <div 
          className={`${
            showBankAcc
              ? "fixed inset-0 z-1 flex items-center justify-center bg-[rgba(0,0,0,.4)]"
              : "hidden"
          }`}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative ">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click from bubbling to the overlay
            handleClose();
          }}
        >
          <Close/>
        </button>
            
            
            <button onClick={deletFn}>delete</button>
        </div>
        <form onSubmit={handleSubmit(submitFn)}>
            <div className="grid grid-cols-2 gap-4">
                {val.map((item, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700" htmlFor={item} >{item}</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id={item} type="text" {...register(item)} />
                    </div>
                ))}
                <select name="" {...register("status")}
              defaultValue={dataa.status || "active"}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        </div>
    );
}; 

export default BankAccPopup;