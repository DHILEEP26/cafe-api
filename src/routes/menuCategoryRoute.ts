import express from "express";
import * as MenuCategoryController from "../controllers/menuCategoryController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes - anyone can view categories
router.get("/", MenuCategoryController.getAllCategories);
router.get("/:id", MenuCategoryController.getCategoryById);

// Admin-only routes
router.post(
  "/",
  authenticateToken,
  isAdmin,
  MenuCategoryController.createCategory
);
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  MenuCategoryController.updateCategory
);
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  MenuCategoryController.deleteCategory
);
router.patch(
  "/:id/toggle-status",
  authenticateToken,
  isAdmin,
  MenuCategoryController.toggleCategoryStatus
);

export default router;