import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
