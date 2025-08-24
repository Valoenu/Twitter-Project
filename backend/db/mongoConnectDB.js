import mongoose from "mongoose";
import dotenv from "dotenv";

// Create and connect mongoo db
const mongoConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDatabse connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error occur while connection to mongoDB: ${error.message}`);
    process.exit(1); // there was some errors
  }
};

export default mongoConnectDB;
