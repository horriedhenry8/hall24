import { useForm } from "react-hook-form";

const CreateBank = ({handleClose,state,setState}) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();


  const form = useForm({
    defaultValues:{
      name:'',
      status:'active'
    }
  });
  const { register, handleSubmit, formState: { errors } } = form;
  

  const onSubmit = async(data) => {
    console.log(data);
    const formData = new FormData();
    if(data.logo && data.logo.length > 0){
    formData.append("logo", data.logo[0]);}
    formData.append("name", data.name);
    formData.append("status", data.status);
    await fetch( import.meta.env.VITE_APP_BASE_URL + "banks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body:formData,
    })
    handleClose();
    setState(!state);
  };

  return (
    <div>
      <div>
        

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="bankName"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Name
            </label>
            <input
              id="bankName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("name", { required: "Bank name is required" })}
            />
            {
              errors.name && <span className="text-red-500">{errors.name.message}</span>
            }
          </div>

          <div className="mb-4">
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700"
            >
              logo
            </label>
            <input
              type="file"
              id="logo"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              {...register("logo")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="ifscCode"
              className="block text-sm font-medium text-gray-700"
            >
              status
            </label>
            <select name="status" id="" {...register("status") } > 
                <option value="active">active</option>
                <option value="inactive">inactive</option>
            </select>
              
            
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBank;
