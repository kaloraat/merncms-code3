import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const mediaSchema = new Schema(
  {
    url: String,
    public_id: String,
    postedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
