import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongodbUrl = process.env.MONGODB_URI;

    if (!mongodbUrl) {
      throw new Error("MONGODB_URI is undefined");
    }

    const conn = await mongoose.connect(mongodbUrl);
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
