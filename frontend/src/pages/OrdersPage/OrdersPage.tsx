import NavBar from "@/components/NavBar";
import { Order } from "@/types/apiTypes";
import { getOrderDetails } from "@/utils/auth";
import { useEffect, useState } from "react";
import RenderOrders from "./RenderOrders";

const OrdersPage = () => {
   const [orders, setOrders] = useState<Order[]>([]);

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
