import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGODB_URI || "";

const connectDB = async () => {
   const dbName = "ecom";
   try {
      await mongoose.connect(dbURI, {
         dbName: dbName,
      });
      console.log(`Successfully connected to ${dbName}`);
   } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1);
   }
};

export default connectDB;
