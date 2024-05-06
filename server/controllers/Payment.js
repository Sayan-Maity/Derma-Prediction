const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/UserModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

module.exports.checkout = async (req, res) => {
  const { amount } = req.body;

  const convertedAmount = Number(amount);
  const options = {
    amount: convertedAmount, // paisa
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);
    if (res.status === 200) {
      console.log("Order Created Successfully");
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.paymentVerification = async (req, res) => {
  console.log(req.body);
  const magicId = req.magicId;

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, plan_type } =
    req.body;
  const secret = process.env.RAZORPAY_SECRET_KEY;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");
  console.log(expectedSignature);
  console.log(razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    // save in DB
    const user = await User.findOne({ magicId });
    if (user) {
      user.paymentHistory.push({
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        //   order_id,
        amount: amount,
        plan_type: plan_type,
      });
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment Successful",
    });

    // res.redirect(
    //   `http://localhost:5173/payment-success?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
      message: "Payment Verification Failed",
    });
  }
};
