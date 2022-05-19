const express = require("express");

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
  createUser,
  currentAuthor,
  users,
  removeUser,
  getUser,
  updateUser,
  updateUserByAdmin,
  currentUserProfile,
} = require("../controllers/auth");

import { requireSignin, isAdmin, isAuthor } from "../middlewares";

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
router.get("/current-user", requireSignin, currentUserProfile);
// users
router.post("/create-user", requireSignin, isAdmin, createUser);
router.put("/update-user", requireSignin, updateUser);
router.put("/update-user-by-admin", requireSignin, isAdmin, updateUserByAdmin);
router.get("/users", requireSignin, isAdmin, users);
router.delete("/user/:userId", requireSignin, isAdmin, removeUser);
router.get("/user/:userId", requireSignin, getUser);

module.exports = router;
