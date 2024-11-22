import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/apiTypes";
import DisplayCartItemCount from "./DisplayCartItemCount";
import { useEffect, useState } from "react";
import { getCartItems, getProductDetailsById } from "@/utils/auth";

interface DisplayProductsProps {
   products: ProductType[];
   handleAddToCart: (id: string) => void;
}

const DisplayProducts = (props: DisplayProductsProps) => {
   const [cartItemCount, setCartItemCount] = useState<number>();

   const handleAddToCartButton = (id: string) => {
      if (cartItemCount) {
         // @ts-ignore
         setCartItemCount((prev) => prev + 1);
      }
      props.handleAddToCart(id);
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

               setCartItemCount(filteredProducts.length);
               //    console.log(filteredProducts)
            }
         } catch (error) {
            console.error("Error fetching cart items or products:", error);
         }
      };

      fetchData();
   }, []);

   const renderProducts = () =>
      props.products.map((product, index) => (
         <div
            className="px-5 py-3 rounded-lg bg-gray-300 max-w-[300px]"
            key={index}
         >
            <div className="font-bold text-gray-600 mb-2">{product.name}</div>
            <img
               className="rounded-xl"
               src={`https://picsum.photos/seed/${Math.random()}/400/300`}
            />
            <div className="flex mt-5 justify-between items-center">
               <div className="font-extrabold text-gray-700">
                  $ {product.price}
               </div>
               <Button
                  className="bg-gray-400 hover:bg-gray-500 border-0"
                  variant="outline"
                  onClick={() => handleAddToCartButton(product._id)}
               >
                  Add to Cart
               </Button>
            </div>
         </div>
      ));

   return (
      <div>
         <div className="flex justify-between text-4xl font-bold text-gray-600">
            <div className="">Products</div>
            <div>
               <DisplayCartItemCount count={cartItemCount} />
            </div>
         </div>
         <div className="flex flex-wrap gap-6 mt-3">{renderProducts()}</div>
      </div>
   );
};

export default DisplayProducts;
