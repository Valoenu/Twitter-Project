import express from "express";

import {
  authCheck,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js"; //Import function from controllers folder (It makes the code better to understand)
import { routeProtected } from "../middlewere/routeProtected.js";

//Create router
const router = express.Router();

//Make express routes

// Signup Endpoint
router.post("/signup", signup); // Signup - function from controller folder

// Login Endpoint
router.post("/login", login);

// Logout Endpoint
router.post("/logout", logout);

// Auth Check Endpoint
router.get("/me", routeProtected, authCheck); // make it protected route

//Export Router
export default router;
