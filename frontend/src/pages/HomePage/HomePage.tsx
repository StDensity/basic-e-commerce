import NavBar from "@/components/NavBar";
import DisplayProducts from "./DisplayProducts";
import { ProductType } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   addItemToTheCartById,
   getAllProducts,
   isAuthenticated,
} from "@/utils/auth";

const HomePage = () => {
   const [products, setProducts] = useState<ProductType[]>([]);
   const navigate = useNavigate();
   useEffect(() => {
      const fetchData = async () => {
         const data = await getAllProducts();
         setProducts(data);
      };
      fetchData();
   }, []);

   const handleAddToCart = async (id: string) => {
      (await isAuthenticated()) ? addItemToTheCartById(id) : navigate("/login");
   };
   return (
      <div>
         <NavBar />
         <div className="bg-gray-200 rounded-lg p-5">
            <DisplayProducts
               products={products}
               handleAddToCart={handleAddToCart}
            />
         </div>
      </div>
   );
};

export default HomePage;
