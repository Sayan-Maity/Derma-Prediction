const User = require("../models/UserModel");
require("dotenv").config();

// Save user search disease history
module.exports.diseaseHistory = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// get user lifestyle analytics data
module.exports.getLifestyleAnalyticsData = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.lifestyleAnalyticsData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// save user lifestyle analytics data
module.exports.postLifestyleAnalyticsData = async (req, res) => {
  const { sleep, exercise, sunlight } = req.body;
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.lifestyleAnalyticsData.push({
      date: formattedDate,
      sleep,
      exercise,
      sunlight,
    });
    await user.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user skin care routine data
module.exports.getSkinCareRoutineData = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.skinCareRoutineData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// save user skin care routine data
module.exports.postSkinCareRoutineData = async (req, res) => {
  const { moisturizer, cleanser, toner } = req.body;
  const magicId = req.magicId;

  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.skinCareRoutineData.push({
      date: formattedDate,
      moisturizer,
      cleanser,
      toner,
    });
    await user.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user stress data
module.exports.getStressData = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.stressData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// save user stress data
module.exports.postStressData = async (req, res) => {
  const { stress, relaxation, meditation } = req.body;
  const magicId = req.magicId;

  try {
    const user = User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.stressData.push({
      date: formattedDate,
      stress,
      relaxation,
      meditation,
    });
    await user.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user diet data
module.exports.getDietData = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.dietData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// save user diet data
module.exports.postDietData = async (req, res) => {
  const { fruit, vegetable, meat } = req.body;
  const magicId = req.magicId;

  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.dietData.push({
      date: formattedDate,
      fruit,
      vegetable,
      meat,
    });
    await user.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user water intake data
module.exports.getWaterIntakeData = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.waterIntakeData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// save user water intake data
module.exports.postWaterIntakeData = async (req, res) => {
  const { water } = req.body;
  const magicId = req.magicId;

  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.waterIntakeData.push({
      date: formattedDate,
      water,
    });
    await user.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user info :
module.exports.getUserInfo = async (req, res) => {
  const magicId = req.magicId;

  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
