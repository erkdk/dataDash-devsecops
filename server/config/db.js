import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas Connected...");
  } catch (err) {
    console.error("Atlas Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
