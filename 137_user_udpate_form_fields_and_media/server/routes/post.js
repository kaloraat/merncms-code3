const express = require("express");
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import {
  requireSignin,
  isAdmin,
  canCreateRead,
  canUpdateDeletePost,
  canDeleteMedia,
  canUpdateDeleteComment,
} from "../middlewares";

// controllers
import {
  uploadImage,
  uploadImageFile,
  createPost,
  posts,
  media,
  removeMedia,
  singlePost,
  removePost,
  editPost,
  postsByAuthor,
  postCount,
  postsForAdmin,
  createComment,
  comments,
  commentCount,
  removeComment,
  userComments,
  updateComment,
  getNumbers,
  postsByCategory,
} from "../controllers/post";

// APPLY canPost MIDDLEWARE (if role is admin or author)
router.post("/upload-image", requireSignin, isAdmin, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireSignin,
  canCreateRead,
  uploadImageFile
);
router.post("/create-post", requireSignin, canCreateRead, createPost);
router.get("/posts-for-admin", postsForAdmin);
router.get("/posts/:page", posts);
router.get("/media", requireSignin, canCreateRead, media);
router.delete("/media/:id", requireSignin, canDeleteMedia, removeMedia);
router.get("/post/:slug", singlePost);
router.put("/post/:postId", requireSignin, canUpdateDeletePost, editPost);
router.delete("/post/:postId", requireSignin, canUpdateDeletePost, removePost);
router.get("/post-count", postCount);
// author
router.get("/posts-by-author", requireSignin, postsByAuthor);
// comments
router.post("/comment/:postId", requireSignin, createComment);
router.get("/comments/:page", requireSignin, isAdmin, comments);
router.get("/comment-count", commentCount);
router.delete(
  "/comment/:commentId",
  requireSignin,
  canUpdateDeleteComment,
  removeComment
);
router.get("/user-comments", requireSignin, userComments);
router.put(
  "/comment/:commentId",
  requireSignin,
  canUpdateDeleteComment,
  updateComment
);
router.get("/numbers", getNumbers);
router.get("/posts-by-category/:slug", postsByCategory);

module.exports = router;
