// Import models user from models folder
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const routeProtected = async (req, res, next) => {
  // 'next' function, after protected route successfully it will be continue to the autChecked function in the auth.route.js

  try {
    const token = req.cookies.jwt; // get cookies from the token
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided - Unauthorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET_JWT); // verify token with secret from .env file

    // if the cookie is invalid
    if (!decoded) {
      return res.status(401).json({ error: "Token is invalid" });
    }

    // Dont send back to the client -password data
    const user = await User.findById(decoded.userId).select("-password"); // find user from the database without password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // add user to the user object
    next(); // call next() function
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
