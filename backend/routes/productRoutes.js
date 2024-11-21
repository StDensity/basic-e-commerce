import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
   createProduct,
   getAllProducts,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post("/create", verifyToken, createProduct);

productRouter.get("/", getAllProducts);

export default productRouter;
