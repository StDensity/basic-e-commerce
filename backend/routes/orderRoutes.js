import express from "express";
import { createOrders, getAllOrders } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const orderRouter = express.Router();

orderRouter.post("/create", verifyToken, createOrders);

orderRouter.get("/", verifyToken, getAllOrders);

export default orderRouter;
