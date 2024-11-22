import { getProductDetailsById } from "@/utils/auth";
import React, { useEffect, useState } from "react";

interface ProductType {
   _id: string;
   name: string;
   price: number;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

interface RenderOrdersProps {
   orders: {
      items: {
         productId: string;
      }[];
   }[];
}

const RenderOrders: React.FC<RenderOrdersProps> = ({ orders }) => {
   const [listOfProductsFromOrder, setListOfProductsFromOrder] = useState<
      ProductType[][]
   >([]);

   useEffect(() => {
      const fetchProducts = async () => {
         const orderCarts = orders.map((order) => order.items);
         const orderCartIds = orderCarts.map((cart) =>
            cart.map((item) => item.productId)
         );

         const productsPromises = orderCartIds.map(async (batch) => {
            const batchPromises = batch.map((id) => getProductDetailsById(id));
            const results = await Promise.all(batchPromises);
            return results.filter(
               (product): product is ProductType =>
                  product !== null && product !== undefined
            );
         });

         const results = await Promise.all(productsPromises);
         setListOfProductsFromOrder(results);
      };

      fetchProducts();
   }, [orders]);

   return (
    <div className="p-4 max-w-2xl mx-auto">
    {listOfProductsFromOrder.map((orderProducts, orderIndex) => (
       <div key={orderIndex} className="mb-4 bg-gray-200 rounded-lg p-5">
          <h2 className="font-bold">Order {orderIndex + 1}</h2>
          {orderProducts.map((product) => (
             <div key={product._id}>{product.name}</div>
          ))}
          {/* @ts-ignore */}
          <div>$ {orders[orderIndex].totalAmount} </div>
          
       </div>
    ))}
 </div>
 
   );
};

export default RenderOrders;
