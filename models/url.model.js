import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    //see time when it is clicked
    visitedHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  {
    timestamps: true, //koi bhi entry kitne bje create hui
  }
);

export default mongoose.model("url", urlSchema);
