import Orders from "../models/orders.js";

export const createOrders = async (req, res) => {
   try {
      const { items, totalAmount, status } = req.body;
      const newOrder = new Orders({
         userId: req.userId,
         items: items,
         totalAmount: totalAmount,
         status: status,
      });
      await newOrder.save();
      res.status(201).json(newOrder);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getAllOrders = async (req, res) => {
   try {
      const orders = await Orders.find({userId: req.userId});
      res.status(200).json(orders);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
