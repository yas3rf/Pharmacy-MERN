import express from "express";
import Sale from "../models/saleSchema.js";
import Product from "../models/productSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { protect } from "../middlewares/auth.js";
import checkStockLevels from "../utils/stockAlert.js";

const saleRouter = express.Router();

// Create a new sale
saleRouter.post("/", async (req, res) => {
  try {
    const cart = req.body.cart;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let sales = [];
    let lowStockProducts = [];

    for (const item of cart) {
      const { productId, quantity, discount } = item;

      const foundProduct = await Product.findById(productId);
      if (!foundProduct) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${productId} not found`,
        });
      }

      // Calculate totalPrice
      const totalPrice = foundProduct.price * quantity - discount;
      if (isNaN(totalPrice) || totalPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid total price calculation",
        });
      }

      const newSale = new Sale({
        product: productId,
        quantity,
        totalPrice,
        discount,
      });

      await newSale.save();
      sales.push(newSale);

      // Update the product quantity in stock
      foundProduct.quantity -= quantity;
      await foundProduct.save();

      // Check for low stock
      const lowStock = await checkStockLevels();
      lowStockProducts = [...lowStockProducts, ...lowStock];
    }

    res.status(201).json({
      success: true,
      sales,
      lowStockProducts,
      message: lowStockProducts.length
        ? "Sale successful, some products are low in stock"
        : "Sale successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create sale",
      error: error.message,
    });
  }
});

// GET ALL SALES
saleRouter.get("/", async (req, res, next) => {
  try {
    const sales = await Sale.find().populate("product");
    res.status(200).json(sales);
  } catch (error) {
    return next(new ErrorHandler("Failed to get sales"));
  }
});

// Generate a sales report for a given period
saleRouter.get("/report", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const sales = await Sale.find({
      saleDate: {
        $gte: start,
        $lte: end,
      },
    }).populate("product");

    const totalSalesAmount = sales.reduce(
      (sum, sale) => sum + sale.totalPrice,
      0
    );
    const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);

    res.json({
      success: true,
      report: {
        totalSalesAmount,
        totalItemsSold,
        sales,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to generate sales report" });
  }
});

export default saleRouter;
