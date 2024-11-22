import Products from "../models/products.js";

export const createProduct = async (req, res) => {
   try {
      const { name, price } = req.body;
      const newProduct = new Products({ name: name, price: price });
      await newProduct.save();
      res.status(201).json(newProduct);
   } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error)
   }
};

export const getAllProducts = async (req, res) => {
   try {
      const products = await Products.find({});
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
