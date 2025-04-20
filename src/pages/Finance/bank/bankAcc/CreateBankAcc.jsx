import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../../../components/ui/Input";

const CreateBankAcc = ({setState,state}) => {

    // create bank account and post it
     const form = useForm({
        defaultValues:{

          status:'active'
        }
      });
      const { register, handleSubmit } = form;
      const submit = async(val) => {
        const {...d} = val
        const data={...d,"method":"put"}
        console.log(data);
        const url = import.meta.env.VITE_APP_BASE_URL + "bank-accounts";
        console.log("URL:", url);
        try{
            const response = await fetch(url , {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if(!response.ok){
                throw new Error(result.message);
            }
            console.log(result);
            setState(!state);
            toast.success(result.message);
        }catch(error) {
            toast.error(error.message);
        }}

        // state & effect for select option data
            const [data,setData]=useState();
        
         useEffect(() => {
            fetch(import.meta.env.VITE_APP_BASE_URL + "banks", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:"bearer " + localStorage.getItem("token"),
              },
            })
            .then((d)=>d.json())
            .then((a)=>setData(a.data))
          }, []);

          const formdata = ["Account Number", "Branch Name", "Openning Balance", "Current Balance"];
          const formSubmitData= [ "account_number", "branch_name", "opening_balance", "current_balance"];

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <select {...register("bank_id")}>
                    {data && data.map((data)=>(
                        <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                </select>
                {
                    formdata.map((item, index) => (
                        <div key={index}>
                            <Input labelClass={"block text-sm font-medium text-gray-700"} htmlFor={formSubmitData[index]} label={item} inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" reg={register(formSubmitData[index])} type="text" placeholder={item} isrequired={true} />
                            {/* <label className="block text-sm font-medium text-gray-700" htmlFor={formSubmitData[index]} >{item}</label>
                            <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id={formSubmitData[index]} type="text" {...register(formSubmitData[index])} /> */}
                        </div>
                    ))
                }
                <select {...register("status")}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateBankAcc;