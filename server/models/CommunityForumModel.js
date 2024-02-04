const mongoose = require("mongoose");

const communityForumSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunityForum", communityForumSchema);
