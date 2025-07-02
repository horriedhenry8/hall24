import React, { useEffect } from "react";
import Login from "../pages/log/Login";
import App from "../App";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoaderPinwheel } from "lucide-react";

const Rootlayout = () => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      var fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(baseurl + "banks", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(
              errorData?.message || `HTTP error! status: ${response.status}`
            );
            error.status = response.status; // Attach status
            error.details = errorData; // Optional: attach full error response
            throw error;
          }

          setAuth(true);
          setLoading(false);
        } catch (error) {
          console.log(error);

          if (error.status === 401) {
            toast.error("Session expired, please login again");
            localStorage.removeItem("token");
            navigate("/");
          } else {
            console.error("Error fetching data:", error);
            toast.error(error.message || "Error fetching data");
          }
          setLoading(false);
          setAuth(false);
        }
      };
      fetchData();
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [auth,token]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <LoaderPinwheel className="animate-spin w-10 h-10" />{" "}
      </div>
    );
  }
  if (!auth) {
    return <Login setAuth={setAuth}/>;
  }
  return (
    <>
      <App />
    </>
  );
};

export default Rootlayout;
