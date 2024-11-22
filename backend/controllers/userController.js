import Users from "../models/user.js";

export const getAllUsers = async (req, res) => {
   try {
      const users = await Users.find({});
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const deleteAccount = async (req, res) => {
   try {
      await Users.deleteOne({ _id: req.userId });
      res.status(200).json({ message: "User deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
