import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Close from "../../../../components/icons/Close";
import toast from "react-hot-toast";
import DeleteModal from "../../../../components/ui/DeleteModal";
import Modal from "../../../../components/ui/Modal";

const BankPopup = ({ showBank, handleClose, data ,state,setState}) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  const [loading, setLoading] = useState(false);

  const [dataa, setData] = useState({});

  const[deleteModal,setDeleteModal] = useState(false);
      const handleDeleteModal = () => {
          setDeleteModal(!deleteModal);
      }
      const handleDelete = () => {
          setDeleteModal(false);
          deletFn();
      }

  useEffect(() => {
    setLoading(true);
    if (showBank) {
      fetch(baseurl + "banks/" + data.id, {
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
          setValue("name", a.data.name);
          setValue("status", a.data.status);
          // setValue("logo", a.data.logo);

          console.log(a.data);
          console.log(dataa);
          setLoading(false);
          
        })
        .catch((error) => {toast.error(error.message || "Error fetching data");setLoading(false);});
    }
  }, [data,showBank]);
  const form = useForm({defaultValues: {
    name: "",
    status: "active",
    logo: null,}});
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    reset
    
  } = form;
  useEffect(() => {
    if (dataa?.name) {
      reset({
        name: dataa.name || "",
        status: dataa.status || "active",
      });
    }
  }, [dataa]);

  const deletFn = async () => {
    await fetch(baseurl + "banks/" + data.id, {
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


  const updateFn = async (hookData) => {
    const formData = new FormData();
    formData.append("_method", "put");
    if (hookData.logo && hookData.logo.length > 0) {
      formData.append("logo", hookData.logo[0]);
    }
    formData.append("name", hookData.name);
    formData.append("status", hookData.status);
  
    try {
      const res = await fetch(baseurl + "banks/" + data.id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "Failed to update bank");
      }
  
      toast.success("Bank updated successfully");
      setState(!state);
      handleClose(); 
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };
  

  return (
    <div
      onClick={(e) => {
        // Clicking outside the modal content will also close the modal
        if (e.target === e.currentTarget) handleClose();
      }}
      className={`${
        showBank
          ? "fixed inset-0 z-1 flex items-center justify-center bg-[rgba(0,0,0,.4)]"
          : "hidden"
      }`}
    >
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
        <div className="mb-4 text-center">
          {loading && (
            <div className="flex justify-center items-center py-4">
              <svg
                className="animate-ping h-10 w-10 text-teal-800"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          
          <h2 className="text-2xl font-semibold text-gray-800">{dataa.name}</h2>
          {dataa.logo && (
            <img
              src={dataa.logo}
              alt="bank logo"
              className="mx-auto my-4 w-32 h-32 object-contain"
            />
          )}
          <p className="text-gray-600">{dataa.status}</p>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleDeleteModal}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Delete
          </button>
        </div>
        <Modal trigger={deleteModal} triggerFn={handleDeleteModal} title={`Delete Bank Account ${getValues("name")}`} description="Are you sure you want to delete this cash account?">
              <DeleteModal deleteFn={handleDelete} cancelFn={handleDeleteModal} />
          </Modal>
        <form onSubmit={handleSubmit(updateFn)}>
          <div className="mb-4">
            <label
              htmlFor="bankName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bank Name
            </label>
            <input
              id="bankName"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-0 focus:ring-teal-800"
              {...register("name")}
            />
            
          </div>

          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-0 focus:ring-teal-800"
              {...register("logo")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-0 focus:ring-teal-800"
              {...register("status")}
              defaultValue={dataa.status || "active"}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 hover:bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-0 "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankPopup;
