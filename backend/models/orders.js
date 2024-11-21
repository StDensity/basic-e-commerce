import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
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
      totalAmount: {
         type: Number,
         required: true,
         min: [0, "Total amount cannot be negative"], // Ensures total amount is non-negative
      },
      status: {
         type: String,
         enum: ["pending", "completed", "canceled"], // Enums for order status
         default: "pending",
      },
   },
   { timestamps: true }
); // Automatically adds `createdAt` and `updatedAt` fields

export default mongoose.model("orders", orderSchema);
