import mongoose from "mongoose";
import Product from "./productSchema.js";

const saleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
