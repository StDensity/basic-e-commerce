import express from "express";
import { createCart, deleteCart, deleteCartItem, getAllCarts } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/create", verifyToken, createCart);
cartRouter.delete("/delete-item", verifyToken, deleteCartItem);
cartRouter.delete("/delete-cart", verifyToken, deleteCart);

cartRouter.get("/", verifyToken, getAllCarts);

export default cartRouter;
