import express from "express";

//Import function from controllers folder (It makes the code better to understand)
import { signup } from "../models /controllerAuth";

//Create router
const router = express.Router();

//Make express routes

// Signup Endpoint
router.post("/signup", signup); // Signup - function from controller folder

// Login Endpoint
router.post("/login", login);

// Logout Endpoint
router.post("/logout", logout);

//Export Router
export default router;
