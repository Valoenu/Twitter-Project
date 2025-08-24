import express from "express";

import {
  followingPostsGet,
  getAllPosts,
  likedPostsGet,
  postComment,
  postCreate,
  postDelete,
  postLike,
  userPostsGet,
} from "../controllers/controller.post.js";
import { routeProtected } from "../middlewere/routeProtected.js";

// Create Router
const router = express.Router();

// Create endpoints
router.get("/user/:username", routeProtected, userPostsGet);
router.delete("/:id", routeProtected, postDelete);
router.post("/like/:id", routeProtected, postLike);
router.get("/following", routeProtected, followingPostsGet);
router.get("/all", routeProtected, getAllPosts);
router.get("/likes/:id", routeProtected, likedPostsGet);
router.post("/comment/:id", routeProtected, postComment);

// Export router
export default router;
