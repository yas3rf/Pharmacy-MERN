import express from "express";
import Product from "../models/productSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { protect } from "../middlewares/auth.js";

const productRouter = express.Router();

//  CREATE A NEW PRODUCT
productRouter.post("/", async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      quantity,
      reorderLevel,
      desc,
      barcode,
      supplier,
    } = req.body;
    if (!name || !category || !price || !quantity || !supplier) {
      return res.status(500).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const product = await Product.findOne({ name });
    if (product) {
      product.quantity += quantity;
      await product.save();
      res.status(201).json({
        success: true,
        message: "Product quantity updated!",
        product,
      });
    }
    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      reorderLevel,
      desc,
      barcode,
      supplier,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "product added!",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to add product",
      error,
    });
  }
});

//  GET ALL PRODUCTS

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().populate("supplier");
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "There is not Product, Please add",
      });
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to get Products"), 404);
  }
});

//  GET A PRODUCT BY ID

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler("Some Error from your request!"), 404);
  }
});

//  UPDATE A PRODUCT
productRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Updated",
      updatedProduct,
    });
  } catch (error) {
    return next(new ErrorHandler("failed to update product"), error);
  }
});

//  DELETE A PRODUCT
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "product Deleted",
    });
  } catch (error) {
    return next(new ErrorHandler("failed to delete product"), error);
  }
});

//  GET PRODUCT REPORTS

productRouter.get("/inventory/report", async (req, res) => {
  try {
    const products = await Product.find();

    // Summarize total inventory value and list products below reorder level
    const totalInventoryValue = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const totalStock = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const productsToReorder = products.filter(
      (product) => product.quantity <= product.reorderLevel
    );

    res.json({
      success: true,
      report: {
        totalInventoryValue,
        totalStock,
        productsToReorder,
        products,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to generate inventory report" });
  }
});

//  CHECK PRODUCT BY BARCODE
productRouter.get("/barcode/:barcode", async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error finding product by barcode" });
  }
});

//  GENERATE AN INVENTORY REPORT

export default productRouter;
