import Post from "../models/post";
import User from "../models/user";
import Category from "../models/category";
import Media from "../models/media";
import slugify from "slugify";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    // console.log(req.body);
    const result = await cloudinary.uploader.upload(req.body.image);
    // console.log(result);
    res.json(result.secure_url);
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, content, categories } = req.body;
    // check if title is taken
    const alreadyExist = await Post.findOne({
      slug: slugify(title.toLowerCase()),
    });
    if (alreadyExist) return res.json({ error: "Title is taken" });

    // get category ids based on category name
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i],
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
      });
    }

    // save post
    setTimeout(async () => {
      try {
        const post = await new Post({
          ...req.body,
          slug: slugify(title),
          categories: ids,
          postedBy: req.user._id,
        }).save();

        // push the post _id to user's posts []
        await User.findByIdAndUpdate(req.user._id, {
          $addToSet: { posts: post._id },
        });

        return res.json(post);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

// export const posts = async (req, res) => {
//   try {
//     const all = await Post.find()
//       .populate("featuredImage")
//       .populate("postedBy", "name")
//       .populate("categories", "name slug")
//       .sort({ createdAt: -1 });
//     res.json(all);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const posts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page || 1;

    const all = await Post.find()
      .skip((page - 1) * perPage)
      .populate("featuredImage")
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

export const uploadImageFile = async (req, res) => {
  try {
    // console.log(req.files);
    const result = await cloudinary.uploader.upload(req.files.file.path);
    // save to db
    const media = await new Media({
      url: result.secure_url,
      public_id: result.public_id,
      postedBy: req.user._id,
    }).save();
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

export const media = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("postedBy", "_id")
      .sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

export const removeMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const singlePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug })
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .populate("featuredImage", "url");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, featuredImage, categories } = req.body;
    // get category ids based on category name
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i],
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
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
        { new: true }
      )
        .populate("postedBy", "name")
        .populate("categories", "name slug")
        .populate("featuredImage", "url");

      res.json(post);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const postsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

export const postsForAdmin = async (req, res) => {
  try {
    const posts = await Post.find().select("title slug");
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};
