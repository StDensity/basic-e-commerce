import {
   adminAuthFailure,
   CartDetails,
   LoginResponseType,
   Order,
   ProductType,
   User,
} from "@/types/apiTypes";
import axios from "axios";
import { getTokenFromSession } from "./storage";
import { redirect } from "react-router-dom";
import { Item } from "@radix-ui/react-navigation-menu";

const BASE_URL = "http://localhost:3000/api/";

export const isAuthenticated = async (): Promise<boolean> => {
   try {
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         return false;
      }
      const url = `${BASE_URL}account/verify`;
      const response = await axios.get(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.valid;
   } catch (error) {
      console.log("Authentication check failed:", error);
      return false;
   }
};

export const login = async (username: string, password: string) => {
   try {
      const url = BASE_URL + "account/login";
      const response = await axios.post<LoginResponseType>(
         url,
         {
            username: username,
            password: password,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.log("error");
   }
};

export const getAllProducts = async (): Promise<ProductType[]> => {
   try {
      const response = await axios.get("http://localhost:3000/api/products");
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const getCartItems = async (): Promise<CartDetails | undefined> => {
   try {
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }
      const url = BASE_URL + "cart";
      const response = await axios.get(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data[0];
   } catch (error) {
      console.log("error");
   }
};

export const getProductDetailsById = async (
   id: string
): Promise<ProductType | undefined> => {
   try {
      const allProducts = await getAllProducts();
      return allProducts.find((product) => product._id === id);
   } catch (error) {
      console.log(error);
   }
};

export const addItemToTheCartById = async (id: string) => {
   try {
      const url = BASE_URL + "cart/create";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }
      const response = await axios.post(
         url,
         {
            items: [
               {
                  productId: id,
                  quantity: 1,
               },
            ],
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         }
      );
      console.log("Cart created:", response.data);
   } catch (error) {
      console.error(error);
   }
};

export const removeItemFromCartById = async (id: string) => {
   try {
      const url = BASE_URL + "cart/delete-item";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }
      const response = await axios.delete(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         data: {
            id: id,
         },
      });
      console.log(response);
      return true;
   } catch (error) {
      console.log(error);
   }
};

export const addCartToOrder = async (
   cartData: CartDetails,
   totalAmount: number
) => {
   try {
      const url = BASE_URL + "orders/create";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.post(
         url,
         {
            items: cartData.items,
            totalAmount: totalAmount,
            status: "pending",
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         }
      );
      console.log(response);
      return response.status;
   } catch (error) {
      console.log(error);
   }
};

export const getOrderDetails = async (): Promise<Order[] | undefined> => {
   try {
      const url = BASE_URL + "orders";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.get(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const dropUserCart = async () => {
   try {
      const url = BASE_URL + "cart/delete-cart";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.delete(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response;
   } catch (error) {
      console.log(error);
   }
};

export const getAllUsers = async (): Promise<
   User[] | undefined | adminAuthFailure
> => {
   try {
      const url = BASE_URL + "users";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.get(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const addProduct = async (name: string, price: number) => {
   try {
      const url = BASE_URL + "products/create";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.post(
         url,
         {
            name: name,
            price: price,
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         }
      );

      console.log(response.data);
   } catch (error) {
      console.log(error);
   }
};

export const createUser = async (username: string, password: string) => {
   try {
      const url = BASE_URL + "account/signup/";

      const response = await axios.post(
         url,
         {
            username: username,
            password: password,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const deleteUser = async () => {
   try {
      const url = BASE_URL + "account/delete/";
      const token = getTokenFromSession();
      console.log(token);
      if (!token) {
         // @ts-ignore
         return redirect("/login");
      }

      const response = await axios.get(url, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      console.log(response);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
