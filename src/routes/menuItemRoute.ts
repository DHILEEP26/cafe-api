import express from "express";
import * as MenuItemController from "../controllers/menuItemController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes - anyone can view menu items
router.get("/", MenuItemController.getAllMenuItems);
router.get("/:id", MenuItemController.getMenuItemById);
router.get("/category/:categoryId", MenuItemController.getMenuItemsByCategory);

// Admin-only routes
router.post(
  "/",
  authenticateToken,
  isAdmin,
  MenuItemController.createMenuItem
);
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  MenuItemController.updateMenuItem
);
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  MenuItemController.deleteMenuItem
);
router.patch(
  "/:id/toggle-availability",
  authenticateToken,
  isAdmin,
  MenuItemController.toggleMenuItemAvailability
);

export default router;