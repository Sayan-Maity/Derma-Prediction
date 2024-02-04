const CommunityForumModel = require("../models/CommunityForumModel");

// GET
module.exports.getCommunityForum = async (req, res) => {
  try {
    const communityForum = await CommunityForumModel.find();
    res.json(communityForum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST
module.exports.postCommunityForum = async (req, res) => {
  const { content, title, author, bannerImage } = req.body;
  try {
    const newCommunityForum = new CommunityForumModel({
      content,
      title,
      author,
      bannerImage,
    });
    await newCommunityForum.save();
    res.json({ message: "Community Forum saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
