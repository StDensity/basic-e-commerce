import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Username is required"],
         unique: true, // Ensures username is unique
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
      //   email: {
      //      type: String,
      //      required: true,
      //      unique: true, // Ensures email is unique
      //      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email validation
      //   },
      role: {
         type: String,
         enum: ["user", "admin"], // Enums for roles
         default: "user",
      },
   },
   { timestamps: true }
);
export default mongoose.model("users", userSchema);
