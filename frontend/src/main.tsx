import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import Signup from "./pages/LoginPage/Signup";

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
   {
      path: "/signup",
      element: <Signup />,
   },
   {
      path: "/account",
      element: <AccountPage />,
   },
   {
      path: "/cart",
      element: <CartPage />,
   },
   {
      path: "/orders",
      element: <OrdersPage />,
   },
]);

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
