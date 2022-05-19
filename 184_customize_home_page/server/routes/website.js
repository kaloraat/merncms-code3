import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares";
// controller
import { contact, createPage, getPage } from "../controllers/website";

router.post("/contact", contact);
router.post("/page", requireSignin, isAdmin, createPage);
router.get("/page/:page", getPage);

export default router;
