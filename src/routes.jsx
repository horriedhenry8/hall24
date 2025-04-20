import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/log/Login";
import Home from "./pages/home/Home";
import Events from "./pages/events/Events";
import Finance from "./pages/Finance/Finance";
import Bank from "./pages/Finance/bank/bank/Bank";
import BankAcc from "./pages/Finance/bank/bankAcc/BankAcc";
import CashAcc from "./pages/Finance/bank/cashAcc/CashAcc";
import Rents from "./pages/rents/Rents";
import HallRentCategory from "./pages/rents/child/HallRentCategory";
import HallRent from "./pages/rents/child/HallRent";
import Nav from "./pages/Nav";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        
        <Login />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Nav />
        <Home />
      </>
    ),
  },
  {
    path: "/finance",
    element: (
      <>
        <Nav />
        <Finance />
      </>
    ),
    children: [
      {
        path: "/finance/bank",
        element: (
          <>
            <Bank />
          </>
        ),
      },
      {
        path: "/finance/bankacc",
        element: (
          <>
            <BankAcc />
          </>
        ),
      },
      {
        path: "/finance/cashaa",
        element: (
          <>
            <CashAcc />
          </>
        ),
      },
    ],
  },
  {
    path: "/events",
    element: (
      <>
        <Nav />
        <Events />
      </>
    ),
  },
  {
    path: "/rents",
    element: (
      <>
        <Nav />
        <Rents />
      </>
    ),
    children: [
      {
        path: "/rents/rentcat",
        element: <HallRentCategory/>,
      },
      {
        path: "/rents/hallrent",
        element: <HallRent/>,
      }
    ]
  },
  {
    path: "*",
    element: (
      <>
        <Nav />
        <div>Not Found</div>
      </>
    ),
  },
]);

export default routes;
