import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input";

const CreateEventTypes = ({ setState, state, handleClose }) => {
  const form = useForm({
    defaultValues: {
      status: "active",
      bride_groom: "bride",
    },
  });

  const { register, handleSubmit, reset } = form;

  const submit = async (val) => {
    const url = import.meta.env.VITE_APP_BASE_URL + "event-types";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(val),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      } else {
        toast.success(result.message);
        handleClose();
        setState(!state);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input
        label="Name"
        htmlFor="name"
        reg={register("name", { required: true })}
        inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        type="text"
        placeholder="Event Type Name"
        isrequired={true}
      />

      <Input
        label="Remarks"
        htmlFor="remarks"
        reg={register("remarks")}
        inpClass="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        type="text"
        placeholder="Remarks (optional)"
      />

      <div className="flex items-center gap-2">
        <input
          id="bride_groom"
          type="checkbox"
          {...register("bride_groom")}
          value="1"
          onChange={(e) =>
            form.setValue("bride_groom", e.target.checked ? "1" : "0")
          }
          checked={form.watch("bride_groom") === "1"}
          className="h-4 w-4 accent-teal-800 border-gray-300 rounded"
        />
        <label htmlFor="bride_groom" className="text-sm text-gray-700">
          Bride Groom
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          {...register("status")}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
      >
        Create
      </button>
    </form>
  );
};

export default CreateEventTypes;
