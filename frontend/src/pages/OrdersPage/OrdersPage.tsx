import NavBar from "@/components/NavBar";
import { Order } from "@/types/apiTypes";
import { getOrderDetails, isAuthenticated } from "@/utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import RenderOrders from "./RenderOrders";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
   const [orders, setOrders] = useState<Order[]>([]);
   const navigate = useNavigate();
   useLayoutEffect(() => {
      const checkAuth = async () => {
         const authenticated = await isAuthenticated();
         if (!authenticated) {
            navigate("/login");
         }
      };
      checkAuth();
   }, []);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await getOrderDetails();
            if (data) {
               setOrders(data);
            }
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, []);

   console.log("base", orders);

   return (
      <div>
         <NavBar />
         <RenderOrders orders={orders} />
      </div>
   );
};

export default OrdersPage;
