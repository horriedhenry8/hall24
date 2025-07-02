import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Events from "./pages/events/Events";
import Finance from "./pages/Finance/Finance";
import Rents from "./pages/rents/Rents";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Rootlayout from "./RootLayout/Rootlayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "rents",
        element: <Rents />,
      },

      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

export default routes;
