import Carts from "../models/carts.js";

export const createCart = async (req, res) => {
   try {
      let { items } = req.body;

      // Ensure items is always an array
      if (!Array.isArray(items)) {
         items = [items]; // If it's not an array, make it an array of one item
      }

      const existingCart = await Carts.findOne({ userId: req.userId });

      if (existingCart) {
         // Use updateOne with $push to append items to the existing array
         await Carts.updateOne(
            { userId: req.userId },
            { $push: { items: { $each: items } } }
         );
         const updatedCart = await Carts.findOne({ userId: req.userId });
         return res.status(200).json(updatedCart);
      }

      // If no existing cart, create a new one
      const newOrder = new Carts({ userId: req.userId, items: items });
      await newOrder.save();
      res.status(201).json(newOrder);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getAllCarts = async (req, res) => {
   try {
      const carts = await Carts.find({ userId: req.userId });
      res.status(200).json(carts);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const deleteCartItem = async (req, res) => {
   try {
      const { id } = req.body; // Extract the product ID to delete
      const existingCart = await Carts.findOne({ userId: req.userId });

      if (!existingCart) {
         return res.status(404).json({ message: "Cart not found" });
      }

      // Remove the item using $pull based on productId
      await Carts.updateOne(
         { userId: req.userId },
         { $pull: { items: { productId: id } } }
      );

      // Get the updated cart
      const updatedCart = await Carts.findOne({ userId: req.userId });

      return res.status(200).json(updatedCart); // Return the updated cart
   } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Failed to delete item" });
   }
};

export const deleteCart = async (req, res) => {
   try {
      const existingCart = await Carts.findOne({ userId: req.userId });

      if (!existingCart) {
         return res.status(404).json({ message: "Cart not found" });
      }
      await Carts.findOneAndDelete({ userId: req.userId });
      // Remove the item using $pull based on productId

      return res.status(200).json({ message: "deleted cart" }); // Return the updated cart
   } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Failed to delete item" });
   }
};
