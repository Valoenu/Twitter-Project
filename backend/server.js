//Import Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/routes.auth.js";
import userRoutes from "./routes/routes.user.js";
import postRoutes from "./routes/routes.post.js";
import notificationRoutes from "./routes/routes.notification.js";

import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import mongoConnectDB from "./db/mongoConnectDB.js";

// configure .env file to be able to get data from there
dotenv.config();

// COnnect to the cloudinary service (Images)
cloudinary.config({
  cloud_name: process.env.NAME_CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create express app
const app = express();
//create Port
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Create Middlewere -> Function which run before you do anything, after or just at any moment between
app.use(express.json({ limit: "5mb" })); // set a value of the post file si
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser()); // cookie parser to be able to parse the request and get cookies

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//Listen express function
app.listen(PORT, () => {
  // PORT - variable in my .env file (Typically it is 5000)
  console.log(`Server is running on port ${PORT}`);
  mongoConnectDB();
});
