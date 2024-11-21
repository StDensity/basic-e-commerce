import NavBar from "@/components/NavBar";
import { ProductType } from "@/types/apiTypes";
import {
   addCartToOrder,
   dropUserCart,
   getCartItems,
   getProductDetailsById,
   removeItemFromCartById,
} from "@/utils/auth";
import { useEffect, useState } from "react";
import RenderCartProducts from "./RenderCartProducts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
   const [products, setProducts] = useState<ProductType[]>([]);
   const navigate = useNavigate();
   const totalAmount = parseFloat(
      products.reduce((sum, item) => sum + item.price, 0).toFixed(2)
   );

   const handleRemoveFromCart = (id: string) => {
      removeItemFromCartById(id);
      setProducts(products.filter((item) => item._id !== id));
   };

   const handleCheckout = async () => {
      const cartData = await getCartItems();
      if (cartData) {
         const response = await addCartToOrder(cartData, totalAmount);
      }
      const response = await dropUserCart();

      navigate("/orders");
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await getCartItems();
            if (data?.items) {
               // console.log(data.items)
               const productsDetails = await Promise.all(
                  data.items.map(async (item) => {
                     const product = await getProductDetailsById(
                        item.productId
                     );
                     return product;
                  })
               );
               const filteredProducts = productsDetails.filter(
                  (product) => product !== undefined
               );

               setProducts(filteredProducts);
               //    console.log(filteredProducts)
            }
         } catch (error) {
            console.error("Error fetching cart items or products:", error);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         <NavBar />
         <RenderCartProducts
            products={products}
            handleRemoveFromCart={handleRemoveFromCart}
         />
         <div className="flex justify-end items-center">
            <div className="p-4 bg-gray-500 rounded-lg">
               <div className="font-bold text-gray-200 mb-3 text-center">
                  {" "}
                  $ {totalAmount}
               </div>
               <Button onClick={handleCheckout}>Checkout</Button>
            </div>
         </div>
      </div>
   );
};

export default CartPage;
