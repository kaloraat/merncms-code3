import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
  create,
  categories,
  removeCategory,
  updateCategory,
  postsByCategory,
} from "../controllers/category";

router.post("/category", requireSignin, isAdmin, create);
router.get("/categories", categories);
router.delete("/category/:slug", requireSignin, isAdmin, removeCategory);
router.put("/category/:slug", requireSignin, isAdmin, updateCategory);
router.get("/posts-by-category/:slug", postsByCategory);

export default router;
