const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    magicId: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    diseaseHistory: [String],
    paymentHistory: [
      {
        date: {
          type: String,
        },
        order_id: {
          type: String,
        },
        amount: {
          type: Number,
        },
        plan_type: {
          type: String,
        }
      },
    ],
    lifestyleAnalyticsData: [
      {
        date: {
          type: String,
        },
        sleep: {
          type: Number,
        },
        exercise: {
          type: Number,
        },
        sunlight: {
          type: Number,
        },
      },
    ],
    skinCareRoutineData: [
      {
        date: {
          type: String,
        },
        cleanser: {
          type: Number,
        },
        moisturizer: {
          type: Number,
        },
        toner: {
          type: Number,
        },
      },
    ],
    stressData: [
      {
        date: {
          type: String,
        },
        stress: {
          type: Number,
        },
        relaxation: {
          type: Number,
        },
        meditation: {
          type: Number,
        },
      },
    ],
    dietData: [
      {
        date: {
          type: String,
        },
        fruit: {
          type: Number,
        },
        vegetable: {
          type: Number,
        },
        meat: {
          type: Number,
        },
      },
    ],
    waterIntakeData: [
      {
        date: {
          type: String,
        },
        water: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
