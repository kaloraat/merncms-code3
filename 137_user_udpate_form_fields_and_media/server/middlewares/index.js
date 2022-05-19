import expressJwt from "express-jwt";
import User from "../models/user";
import Post from "../models/post";
import Media from "../models/media";
import Comment from "../models/comment";

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const isAdmin = async (req, res, next) => {
  try {
    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    // console.log("isAdmin ===> ", user);
    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAuthor = async (req, res, next) => {
  try {
    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    // console.log("isAdmin ===> ", user);
    if (user.role !== "Author") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const canCreateRead = async (req, res, next) => {
  try {
    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    // console.log("isAdmin ===> ", user);
    switch (user.role) {
      case "Admin":
        next();
        break;
      case "Author":
        next();
        break;
      default:
        return res.status(400).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canUpdateDeletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    console.log("post found in middleware => ", post);

    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    // console.log("isAdmin ===> ", user);
    switch (user.role) {
      case "Admin":
        next();
        break;
      case "Author":
        if (post.postedBy.toString() !== req.user._id.toString()) {
          return res.status(400).send("Unauthorized");
        } else {
          next();
        }
        break;
      default:
        return res.status(400).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canDeleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    // console.log("isAdmin ===> ", user);
    switch (user.role) {
      case "Admin":
        next();
        break;
      case "Author":
        if (media.postedBy.toString() !== req.user._id.toString()) {
          return res.status(400).send("Unauthorized");
        } else {
          next();
        }
        break;
      default:
        return res.status(400).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canUpdateDeleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    // you get req.user._id from verified jwt token
    const user = await User.findById(req.user._id);
    console.log("canUpdateDeleteUser comment ===> ", comment, user);
    switch (user.role) {
      case "Admin":
        next();
        break;
      case "Author":
        if (comment.postedBy.toString() === req.user._id.toString()) {
          next();
        }
        break;
      case "Subscriber":
        if (comment.postedBy.toString() === req.user._id.toString()) {
          next();
        }
        break;
      default:
        return res.status(400).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};
