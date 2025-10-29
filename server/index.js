import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import healthRouter from './health.js';

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/health', healthRouter);

import itemsRouter from "./routes/items.js";
app.use("/api/items", itemsRouter);

// Error handling for Atlas
mongoose.connection.on("error", (err) => {
  console.error("Atlas DB Error:", err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
