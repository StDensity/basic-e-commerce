import jwt from "jsonwebtoken";
import Users from "../models/user.js";

export const loginUser = async (req, res) => {
   try {
      const { username, password } = req.body;
      console.log(req.body);
      console.log(username);

      const user = await Users.findOne({ username });
      console.log(user)
      if (!user || user.password !== password) {
         return res.status(200).json({
            successStatus: false,
            message: "Invalid email or password",
         });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: "1h",
      });

      res.status(200).json({ successStatus: true, token });
   } catch (error) {
      res.status(500).json({ successStatus: false, message: error.message });
   }
};

export const createUser = async (req, res) => {
   try {
      const { username, password } = req.body;
      console.log(username, password);
      const newUser = new Users({ username: username, password: password });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
         expiresIn: "1h",
      });

      res.status(201).json({ token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
