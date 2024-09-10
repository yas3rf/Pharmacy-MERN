// routes/alertRoutes.js

import express from "express";
import checkStockLevels from "../utils/stockAlert.js";
import { protect } from "../middlewares/auth.js";

const alertRouter = express.Router();

alertRouter.get("/stock-alerts", async (req, res) => {
  try {
    const lowStockProducts = await checkStockLevels();
    res.status(200).json({ success: true, lowStockProducts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve stock alerts" });
  }
});

export default alertRouter;
