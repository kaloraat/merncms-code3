import express from "express";

const router = express.Router();

// controller
import { contact } from "../controllers/website";

router.post("/contact", contact);

export default router;
