const jwt = require("jsonwebtoken");

const { Users } = require("./../models/user");

module.exports = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Bearer");
    const feedback = await Users.getUserByToken(tokenHeader);
    if (feedback.status !== 200) {
      return res.status(feedback.status).json(feedback);
    }
    req.body.user = feedback;
    next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error while identifying User's identity"
    });
  }
};
