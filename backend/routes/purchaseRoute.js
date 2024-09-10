import express from "express";
import Purchase from "../models/purchaseSchema.js";
import Product from "../models/productSchema.js";
import checkStockLevels from "../utils/stockAlert.js";
import { protect } from "../middlewares/auth.js";

const purchaseRouter = express.Router();

// Create a new purchase
purchaseRouter.post("/", async (req, res) => {
  try {
    const { product, supplier } = req.body;
    const quantity = Number(req.body.quantity); // Cast to number
    const purchasePrice = Number(req.body.purchasePrice);

    // Update product quantity
    const updatedProduct = await Product.findByIdAndUpdate(
      product,
      { $inc: { quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const purchase = new Purchase({
      product,
      supplier,
      quantity,
      purchasePrice,
    });
    await purchase.save();

    res.status(201).json({
      success: true,
      purchase,

      message: "Purchase Successfull",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create purchase" });
  }
});

// Get all purchases
purchaseRouter.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("supplier")
      .populate("product");
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve purchases" });
  }
});

export default purchaseRouter;
