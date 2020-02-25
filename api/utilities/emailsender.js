const dotenv = require("dotenv");
dotenv.config();

const mailGun = require("mailgun-js")({
  apiKey: process.env.PUBLIC_APIKEY,
  domain: process.env.DOMAIN,
  isPrivate: true
});
const mailgun = require("mailgun-js")({
  apiKey: process.env.SECRET_APIKEY,
  domain: process.env.DOMAIN,
  isPrivate: true
});

async function emailer(userAddress, email, callback) {
  try {
    await mailGun.validate(userAddress, async (error, body) => {
      console.log(error);
      if (error) {
        const err = {
          status: 400,
          message: "error while verifying email address"
        };
        return callback(err);
      } else if (body && body.is_valid) {
        const data = {
          from: "support@sandboxa1a30c9638fc46b28d04415a8784970c.mailgun.org",
          to: userAddress,
          subject: email.subject,
          text: email.text
        };
        await mailgun.messages().send(data, (error, body) => {
          if (error) {
            const err = {
              status: 400,
              message: `error while sending verification link to your email address: ${userAddress}`
            };
            return callback(err);
          }
          if (body && body.message === "Queued. Thank you.") {
            const result = {
              status: 200,
              message:
                "email sent successfully, please do verify your account from your email account"
            };
            return callback(undefined, result);
          }
        });
      } else {
        const err = {
          status: 400,
          message: `Invalid email Address: ${userAddress}`
        };
        return callback(err);
      }
    });
  } catch (e) {
    const err = {
      status: 400,
      message: "Email Account verification and email sending failed"
    };
    return callback(err);
  }
}

module.exports = { emailer };
