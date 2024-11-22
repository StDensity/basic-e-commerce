export interface ProductType {
   _id: string; // MongoDB ObjectId, represented as a string
   name: string; // Name of the product
   price: number; // Price of the product
   createdAt: string; // Date of creation in ISO 8601 format (as a string)
   updatedAt: string; // Date of last update in ISO 8601 format (as a string)
   __v: number; // Internal version key from MongoDB, typically a number
}

export interface LoginResponseType {
   token?: string;
   successStatus: boolean;
}

export interface CartDetails {
   _id: string;
   userId: string;
   items: CartItem[];
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface CartItem {
   productId: string;
   quantity: number;
   _id: string;
}

export interface Order {
   _id: string;
   userId: string;
   items: CartItem[];
   totalAmount: number;
   status: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface User {
   _id: string;
   username: string;
   password: string;
   role: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface adminAuthFailure {
   allowAccess: boolean;
   message: string;
}
