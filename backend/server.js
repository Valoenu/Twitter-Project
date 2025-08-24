import express from "express";
import dotenv from "dotenv";
import RoutesAuth from "./routes/RoutesAuth.js";
import mongoConnectDB from "./db/mongoConnectDB.js";

dotenv.config();

//create express app
const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

app.use("/api/auth", RoutesAuth);

//Listen express function
app.listen(PORT, () => {
  // PORT - variable in my .env file (Typically it is 5000)
  console.log(`Server is running at ${PORT}`);
  mongoConnectDB();
});
