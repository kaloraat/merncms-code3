import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      max: 20000,
    },
    postedBy: { type: ObjectId, ref: "User" },
    postId: { type: ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
