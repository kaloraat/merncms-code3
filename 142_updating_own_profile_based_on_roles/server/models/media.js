import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const mediaSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
