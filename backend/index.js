import express from "express";
import { dbConnection } from "./db/mongo.js";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/productRoute.js";
import saleRouter from "./routes/saleRoute.js";
import userRouter from "./routes/authRoutes.js";
import supplierRouter from "./routes/supplierRoute.js";
import purchaseRouter from "./routes/purchaseRoute.js";
import alertRouter from "./routes/alertRoute.js";

dotenv.config({ path: "./config/.env" });
dbConnection();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
app.use("/api/products", productRouter);
app.use("/api/sales", saleRouter);
app.use("/api/users", userRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/alert", alertRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
