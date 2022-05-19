import Post from "../models/post";
import User from "../models/user";
import Category from "../models/category";
import Media from "../models/media";
import Comment from "../models/comment";
import cloudinary from "cloudinary";
import slugify from "slugify";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    // console.log(req.body.image);
    const result = await cloudinary.uploader.upload(req.body.image);
    // console.log("uploaded image url => ", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const uploadImageFile = async (req, res) => {
  //   console.log(req.files); // [] of File {}
  try {
    // console.log(req.body.image);
    const result = await cloudinary.uploader.upload(req.files.file.path);
    // console.log("uploaded image url => ", result);
    // save to db
    const media = await new Media({
      url: result.secure_url,
      public_id: result.public_id,
      postedBy: req.user._id,
    }).save();
    res.json(media);
    // res.json({
    //   url: result.secure_url,
    //   public_id: result.public_id,
    // });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const createPost = async (req, res) => {
  console.log("createPost", req.body);
  try {
    const { title, content, categories } = req.body;
    // check if title is taken
    const alreadyExist = await Post.findOne({
      slug: slugify(title),
    }).exec();
    if (alreadyExist) return res.json({ error: "Title is taken" });

    // get category ids based on category name
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({ name: categories[i] }).exec((err, c) => {
        if (err) {
          console.log(err);
        }
        // console.log("c", c._id);
        ids.push(c._id);
      });
    }
    // save post
    setTimeout(async () => {
      const newPost = await new Post({
        ...req.body,
        slug: slugify(title),
        categories: ids,
        postedBy: req.user._id,
      }).save();

      // push post id to user's posts array
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { posts: newPost._id },
      });
      return res.json(newPost);
    }, 1000);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const postsForAdmin = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("postedBy", "_id name")
      .populate("categories", "_id name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 })
      .exec();
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const posts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const posts = await Post.find({})
      .skip((page - 1) * perPage)
      .populate("postedBy", "_id name")
      .populate("categories", "_id name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 })
      .limit(perPage)
      .exec();
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const media = async (req, res) => {
  try {
    const media = await Media.find({})
      .populate("postedBy", "_id")
      .sort({ createdAt: -1 });
    return res.json(media);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const removeMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByIdAndDelete(id);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const singlePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug })
      .populate("postedBy", "_id name")
      .populate("categories", "_id name slug")
      .populate("featuredImage", "_id url");
    // comments
    const comments = await Comment.find({ postId: post._id })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    return res.json({ post, comments });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const removePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, featuredImage, categories } = req.body;
    // get ids for catrgories
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({ name: categories[i] }).exec((err, c) => {
        if (err) {
          console.log(err);
        }
        // console.log("c", c._id);
        ids.push(c._id);
      });
    }
    setTimeout(async () => {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          slug: slugify(title),
          content,
          categories: ids,
          featuredImage,
        },
        {
          new: true,
        }
      )
        .populate("postedBy", "_id name")
        .populate("categories", "_id name slug")
        .populate("featuredImage", "_id url");

      return res.json(post);
    }, 1000);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const postsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("categories", "_id name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 })
      .exec();
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    return res.json(count);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const createComment = async (req, res) => {
  console.log(req.body);
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    let created = await new Comment({
      content: comment,
      postId,
      postedBy: req.user._id,
    }).save();
    created = await created.populate("postedBy", "_id name");
    res.json(created);
  } catch (err) {
    console.log(err);
  }
};

export const comments = async (req, res) => {
  try {
    console.log(req.params);
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;

    const comments = await Comment.find({})
      .skip((page - 1) * perPage)
      .populate("postedBy", "_id name")
      .populate("postId", "title slug")
      .sort({ createdAt: -1 })
      .limit(perPage)
      .exec();
    return res.json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const commentCount = async (req, res) => {
  try {
    const count = await Comment.countDocuments();
    return res.json(count);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log("commentId", commentId);
    const comment = await Comment.findByIdAndDelete(commentId);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const userComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("postId", "title slug")
      .sort({ createdAt: -1 })
      .exec();
    return res.json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const updateComment = async (req, res) => {
  // console.log("update comment", req.body);
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updated = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    console.log("comment updated", updated);
    return res.json(updated);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getNumbers = async (req, res) => {
  try {
    const posts = await Post.countDocuments();
    const users = await User.countDocuments();
    const comments = await Comment.countDocuments();
    const categories = await Category.countDocuments();
    return res.json({
      posts,
      users,
      comments,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const postsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    const posts = await Post.find({ categories: category._id })
      .populate("featuredImage")
      .limit(24);
    // console.log(category, posts);
    res.json({ category, posts });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
