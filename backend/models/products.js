import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true, // Ensures product name is unique
      },
      // description: {
      //    type: String,
      //    required: true,
      // },
      price: {
         type: Number,
         required: true,
         min: [0, "Price must be a positive number"], // Ensures price is positive
      },
      // stock: {
      //    type: Number,
      //    required: true,
      //    min: [0, "Stock cannot be negative"], // Ensures stock is non-negative
      // },
   },
   { timestamps: true }
); // Automatically adds `createdAt` and `updatedAt` fields

export default mongoose.model("products", productSchema);
