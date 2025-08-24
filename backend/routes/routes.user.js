import express from "express";
import { routeProtected } from "../middlewere/routeProtected.js";
import {
  suggestedUsersGet,
  updateUser,
  unfollowFollowUser,
  userGetProfile,
} from "../controllers/controller.user.js";

// create router
const router = express.Router();

// Make routes
router.get("/profile/:username", routeProtected, userGetProfile);
router.get("/suggested", routeProtected, suggestedUsersGet);
router.post("/follow/:id", routeProtected, unfollowFollowUser);
router.post("/update", routeProtected, updateUser);

export default router;
