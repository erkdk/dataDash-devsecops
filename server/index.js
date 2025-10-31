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

//------
// Add this to your index.js after connectDB()
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  // In production, you might want to exit and let Kubernetes restart
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
//------

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
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
