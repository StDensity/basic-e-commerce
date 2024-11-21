import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/apiTypes";

interface DisplayProductsProps {
   products: ProductType[];
   handleAddToCart: (id: string) => void;
}

const DisplayProducts = (props: DisplayProductsProps) => {
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
                  onClick={() => props.handleAddToCart(product._id)}
               >
                  Add to Cart
               </Button>
            </div>
         </div>
      ));

   return (
      <div>
         <div className="text-4xl font-bold text-gray-600">Products</div>
         <div className="flex flex-wrap gap-6 mt-3">{renderProducts()}</div>
      </div>
   );
};

export default DisplayProducts;
