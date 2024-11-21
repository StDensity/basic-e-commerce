import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users", // References the `users` collection
         required: true,
      },
      items: [
         {
            productId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "products", // References the `products` collection
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
               min: [1, "Quantity must be at least 1"], // Ensures quantity is at least 1
            },
         },
      ],
   },
   { timestamps: true }
); // Automatically adds `createdAt` and `updatedAt` fields

export default mongoose.model("carts", cartSchema);
