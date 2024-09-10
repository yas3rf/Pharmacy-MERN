import express from "express";
import Supplier from "../models/supplierSchema.js";
import { protect } from "../middlewares/auth.js";

const supplierRouter = express.Router();

// ADD NEW SUPPLIER
supplierRouter.post("/", async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({
      success: true,
      message: "supplier added",
      supplier,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add new supplier" });
  }
});

//  GET ALL SUPPLIERS
supplierRouter.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({ success: true, suppliers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve suppliers" });
  }
});

//  UPDATE SUPPLIER:

supplierRouter.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }
    res.status(200).json({ success: true, supplier });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update supplier" });
  }
});

//  DELETE SUPPLIER
supplierRouter.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }
    res.status(200).json({ success: true, message: "Supplier deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete supplier" });
  }
});

export default supplierRouter;
