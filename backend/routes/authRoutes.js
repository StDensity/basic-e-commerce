import express from "express";
const authRouter = express.Router();
import { createUser, loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

authRouter.post("/login", loginUser);

authRouter.post("/signup", createUser);

authRouter.get("/verify", verifyToken, (req, res) => {
   res.status(200).json({
      valid: true,
      message: "Token verified successfully",
   });
});

export default authRouter;
