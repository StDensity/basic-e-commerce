import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProduct } from "@/utils/auth";
import { useState } from "react";

const AddProducts = () => {
   const [productName, setProductName] = useState<string>("");
   const [productPrice, setProductPrice] = useState<string>("");
   const handleAddProduct = async () => {
      if (productName !== "" || parseFloat(productPrice) > 1) {
         addProduct(productName, parseFloat(productPrice));
      }
   };
   return (
      <div>
         <div className="text-4xl font-bold text-gray-600">
            Add New Products
         </div>

         <div className="max-w-sm flex-col gap-4">
            <Input
               placeholder="Product name"
               value={productName}
               onChange={(e) => setProductName(e.target.value)}
            />
            <Input
               className="my-4"
               placeholder="Price"
               value={productPrice}
               onChange={(e) => setProductPrice(e.target.value)}
            />
            <Button onClick={() => handleAddProduct()}>Submit</Button>
         </div>
      </div>
   );
};

export default AddProducts;

