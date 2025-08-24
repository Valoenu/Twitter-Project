import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import mongoConnectDB from "./db/mongoConnectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

//create Port
const PORT = process.env.PORT || 5000;

//create express app
const app = express();

// Create Middlewere -> Function which run before you do anything, after or just at any moment between
app.use(express.json()); // to be able to parse the request.body from react

//Another middlewere
app.use(express.urlencoded({ extended: true })); // to parse url encoded

app.use(cookieParser()); // cookie parser to be able to parse the request and get cookies

app.use("/api/auth", authRoutes);

//Listen express function
app.listen(PORT, () => {
  // PORT - variable in my .env file (Typically it is 5000)
  console.log(`Server is running at ${PORT}`);
  mongoConnectDB();
});
