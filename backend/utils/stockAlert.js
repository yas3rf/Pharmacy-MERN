import Product from "../models/productSchema.js";

const checkStockLevels = async () => {
  try {
    const lowStockProducts = await Product.find({
      quantity: { $lt: 10 },
    });

    return lowStockProducts;
  } catch (error) {
    console.error("Error Checking Stock Levels:", error);
  }
};

export default checkStockLevels;
