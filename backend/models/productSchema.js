import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  desc: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  reorderLevel: { type: Number, default: 10 },
  barcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
