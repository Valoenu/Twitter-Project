// Import token package
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  // sign token
  const token = jwt.sign({ userId }, process.env.SECRET_JWT, {
    // SECRET_JWT comes from my .env file (go to bash-> 'openssl rand -base64 32', copy and paste there), add user id as a payload
    expiresIn: "7d", // how long this token will live
  });

  // Add additionall options and send into cookies by using res.cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
    secure: process.env.EMV_NDOE !== "development", // only true in the production mode
    sameSite: "strict", // Prevent CSRF Attacks
    httpOnly: true, // make it only http, avoid css attacks (cross site scripting attacks)
  }); // give the name of the token
};
