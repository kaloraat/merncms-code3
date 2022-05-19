const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
      max: 20000,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    postId: {
      type: ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
