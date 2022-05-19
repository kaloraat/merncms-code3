const express = require("express");

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares";

// controllers
import { contact, createPage, getPage } from "../controllers/website";

// APPLY canPost MIDDLEWARE (if role is admin or author)
router.post("/contact", contact);

// home page
router.post("/page", requireSignin, isAdmin, createPage);
router.get("/page/:page", getPage);

module.exports = router;
