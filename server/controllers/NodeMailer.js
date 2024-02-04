const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "358100156745-e2iq8mhrir3i4p04hm9cj5978astgdgt.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04T0ZVVDWGLKBCgYIARAAGAQSNwF-L9IrGQfZEtKwKy40NN7Wq7JvvIuZpvn9N944Os5ZC1LqmJcCPn_-cev8mpTRb8RzywDVIaQ";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.sendEmail = async (req, res) => {
    const { email, userName } = req.body;
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sayancr777@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Dermify Team <sayancr777@gmail.com>",
      to: email,
      subject: "Check your current skin status",
      html: `Hello ${userName} <br /><br/> We hope this message finds you well. At Dermify.Ai, we are committed to supporting you on your skincare and wellness journey. To ensure that we continue to provide you with the best possible care, we kindly request you to update your health status on our website. <br /> Taking a moment to update your health information allows us to tailor our services to meet your specific needs. Your well-being is our top priority, and by keeping your health records current, we can better assist you in achieving your health goals. <br /><br/> Here's how you can update your health status:<br /> Click on the following link: <br /><br/> Update any relevant information, such as water intake, diet analysis, skin care. <br /> If you encounter any issues or have questions about the update process, feel free to contact our customer support team at dermify.ai@gmail.com <br /> Thank you for being a valued member of Dermify.Ai. We appreciate your commitment to your health, and we look forward to continuing to assist you on your wellness journey. If you are not yet plus member, we encourage you to look forward into it ! Plus members can get online doctor consultation on a weekly basis. <br /><br/> Healthy skin,<br/> Team Dermify.`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
