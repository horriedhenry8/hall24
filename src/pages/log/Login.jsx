import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/zod";


const baseurl = import.meta.env.VITE_APP_BASE_URL;

const Login = ({setAuth}) => {
  const { register, handleSubmit,formState: { errors }} = useForm({resolver: zodResolver(loginSchema)});

  const submit = async (data) => {
    const { remember, ...a } = data;
    const paylod = {
      ...a,
      remember: remember ? 1 : 0,
    };
    console.log(paylod);
    
    await fetch(baseurl + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paylod),
    })
      .then((response) => response.json())
      .then((data) => {
        data.data
          ? (console.log(data),
            localStorage.setItem("token", data.data.token),
            toast.success(data.message),
            setAuth(true))
          : toast.error(data.message);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url(/abc.jpg)] ">
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-xl  rounded-2xl shadow-lg">
        <Toaster position="top-left" />
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form className="space-y-4 " onSubmit={handleSubmit(submit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-start text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              {...register("email")}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (<p className="text-red-500">{errors.email.message} </p>)}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-start text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          {errors.password && (<p className="text-red-500">{errors.password.message} </p>)}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                {...register("remember")}
                className="mr-2 rounded accent-teal-800"
              />
              Remember Me
            </label>
            <a href="#" className="text-teal-700 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
