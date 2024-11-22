import jwt from "jsonwebtoken";
import Users from "../models/user.js";

export const verifyToken = async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];

   if (!token) {
      return res.status(403).json({ message: "No token provided" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findOne({ _id: decoded.id });
      if (!user) {
         return res
            .status(200)
            .json({ valid: false, message: "User not found" });
      }
      req.userId = decoded.id;
      next();
   } catch (error) {
      return res
         .status(200)
         .json({ valid: false, message: "Invalid or expired token" });
   }
};

export const onlyAdmin = async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];

   if (!token) {
      return res.status(403).json({ message: "No token provided" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findOne({ _id: decoded.id });
      if (!user) {
         return res
            .status(200)
            .json({ allowAccess: false, message: "User not found" });
      }
      if (user.role !== "admin") {
         return res
            .status(200)
            .json({ allowAccess: false, message: "Does not have permission" });
      }
      req.userId = decoded.id;
      next();
   } catch (error) {
      return res
         .status(200)
         .json({ valid: false, message: "Invalid or expired token" });
   }
};
