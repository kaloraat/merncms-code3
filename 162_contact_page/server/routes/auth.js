const express = require("express");

const router = express.Router();

// middleware
import { requireSignin, isAdmin, isAuthor } from "../middlewares";
// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
  createUser,
  users,
  deleteUser,
  currentUserProfile,
  updateUserByAdmin,
  updateUserByUser,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/current-admin", requireSignin, isAdmin, currentUser);
router.get("/current-author", requireSignin, isAuthor, currentUser);
router.get("/current-subscriber", requireSignin, currentUser);
router.post("/create-user", requireSignin, isAdmin, createUser);
router.get("/users", requireSignin, isAdmin, users);
router.delete("/user/:userId", requireSignin, isAdmin, deleteUser);
router.get("/user/:userId", requireSignin, currentUserProfile);
router.put("/update-user-by-admin", requireSignin, isAdmin, updateUserByAdmin);
router.put("/update-user-by-user", requireSignin, updateUserByUser);

module.exports = router;
