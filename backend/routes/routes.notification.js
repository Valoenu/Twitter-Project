import express from "express";
import { routeProtected } from "../middlewere/routeProtected.js";
import {
  notificationsDelete,
  notificationsGet,
} from "../controllers/controller.notification.js";

// create router
const router = express.Router();

// create endpoint routers
router.get("/", routeProtected, notificationsGet);
router.delete("/", routeProtected, notificationsDelete);

// export router
export default router;
