import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { onlyAdmin } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.get("/", onlyAdmin, getAllUsers);

export default userRouter;
