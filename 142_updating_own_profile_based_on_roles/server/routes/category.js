const express = require("express");

const router = express.Router();

// controllers
const {
  create,
  read,
  update,
  remove,
  singleCategory,
} = require("../controllers/category");
import { requireSignin, isAdmin } from "../middlewares";

router.post("/category", requireSignin, isAdmin, create);
router.get("/categories", read);
router.put("/category/:slug", requireSignin, isAdmin, update);
router.delete("/category/:slug", requireSignin, isAdmin, remove);
router.get("/category/:slug", singleCategory);

module.exports = router;
