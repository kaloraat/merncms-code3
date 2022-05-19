import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const websiteSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      lowercase: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    fullWidthImage: { type: ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

export default mongoose.model("Website", websiteSchema);
