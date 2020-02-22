const { pick } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { ObjectID } = require("mongodb");
const Payments = require("./../models/Payment");

const { Users, tokenGenerator } = require("./../models/user");
const { emailer } = require("./../utilities/emailsender");

const url = "http://localhost:3000/user";
//check reset_password.js for editing

exports.createUser = async (req, res, next) => {
  try {
    const token = await tokenGenerator.generate();

    const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      signInToken: token
    });
    const emailVerify = await Users.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });
    if (emailVerify) {
      const fault = emailVerify.email === req.body.email ? "Email" : "Username";
      return res.status(403).json({
        status: 403,
        message: `${fault} already exist`
      });
    }
    const data = {
      subject: "ACCOUNT VERIFICATION",
      text: `HI, ${req.body.email} <br> Welcome to our Todo App, but to continue with our app usage please click on the link below to activate your account: <br> ${url}/${req.body.email}/${token} `
    };
    await emailer(req.body.email, data, async (err, data) => {
      try {
        if (err) {
          return res.status(err.status).json(err);
        }

        const payment = new Payments({
          CustomerEmail: req.body.email
        });
        const pay = await payment.save();
        if (!pay) {
          throw Error();
        }

        await user.save();
        res.status(data.status).json(data);
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: "error while sending Account Verification link to User"
        });
      }
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Unable to create a user account"
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const body = pick(req.body, ["username", "password"]);
    const user = await Users.findOne({
      $or: [{ email: body.username }, { username: body.username }]
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Username/Email or Password is Invalid"
      });
    }
    const checkPassword = await bcrypt.compare(body.password, user.password);
    if (checkPassword) {
      if (user.signInToken !== null) {
        return res.status(400).json({
          status: 400,
          message: "please do verify your account from your email account"
        });
      }
      if (user.lastSeen === null) {
        await user.set({ lastSeen: new Date() });
        await user.generateAuth();
        user.lastSeen = moment(user.lastSeen).calendar();

        await user.save();
        return res.status(200).json({
          status: 200,
          message: user
        });
      } else {
        const updateNeeded = await Users.getUserByToken(user.token.token);
        await user.set({ lastSeen: updateNeeded.time });
        user.lastSeen = moment(updateNeeded.time).calendar();

        const payment = new Payments({
          CustomerEmail: user.email
        });
        const pay = await payment.save();
        if (!pay) {
          throw Error();
        }

        await user.generateAuth();
        await user.save();

        return res.status(200).json({
          status: 200,
          message: user
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Username/Email or Password is Invalid"
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Unable to validate user's login data"
    });
  }
};

exports.verifyUserAccount = async (req, res, next) => {
  try {
    if (tokenGenerator.isValid(req.params.token)) {
      if (req.query.passwordForgotten) {
        const user = await Users.findOneAndUpdate(
          {
            email: req.params.email,
            authToken: req.params.token,
            isValid: false
          },
          {
            $set: {
              authToken: null,
              isValid: true
            }
          },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({
            status: 404,
            message: "Email or Token is Invalid"
          });
        }
        return res.status(200).json({
          status: 200,
          message: user
        });
      } else {
        const user = await Users.findOneAndUpdate(
          { email: req.params.email, signInToken: req.params.token },
          {
            $set: {
              signInToken: null
            }
          },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({
            status: 404,
            message: "Email or Token is Invalid"
          });
        }
        return res.status(200).json({
          status: 200,
          message: user
        });
      }
    }
    return res.status(404).json({
      status: 404,
      message: "Invalid Token"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Unable to verify account details"
    });
  }
};

exports.resetUserPassword = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: `No User with such Email Address`
      });
    }
    const token = await tokenGenerator.generate();
    const data = {
      subject: "PASSWORD RESET AUTHORIZATION",
      text: `HI, ${req.body.email} a password reset has been initialized on your account with us. if you are the one that initialised it click on this link below else ignore this message ${url}/${req.body.email}/${token}?passwordForgotten=true `
    };
    await emailer(user.email, data, async (err, result) => {
      if (err) {
        return res.status(err.status).json(err);
      }
      await user.set({
        authToken: token
      });
      const update = await user.save();
      if (!update) {
        return res.status(400).json({
          status: 400,
          message: `An error was encountered while reseting your password`
        });
      }
      return res.status(result.status).json(result);
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: `Unable to reset your password`
    });
  }
};

exports.changeUserPassword = async (req, res, next) => {
  try {
    if (ObjectID.isValid(req.params.id)) {
      const user = await Users.findById({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "No User Found"
        });
      }
      if (!user.isValid) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Access"
        });
      }
      await user.set({ password: req.body.password, isValid: false });
      await user.save();
      return res.status(200).json({
        status: 200,
        message: "Password Change was Successful"
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Invalid Id used"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: `Unable to Change your password`
    });
  }
};

exports.changeUserDetails = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.body.user.message._id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Id used"
      });
    }
    const body = pick(req.body, [
      "firstName",
      "lastName",
      "password",
      "dob",
      "address",
      "phoneNumber"
    ]);
    const user = await Users.findById({ _id: req.body.user.message._id });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Account not found"
      });
    }

    if (user.lastUpdate === null) {
      body.lastUpdate = new Date();
      await user.set(body);
      await user.save();
      return res.status(200).json({
        status: 200,
        message: {
          info: "Your details has been updated Successfully",
          details: user
        }
      });
    }
    if (user.lastUpdate !== null) {
      const time = moment(new Date()).diff(user.lastUpdate, "days");
      if (time <= 60) {
        return res.status(400).json({
          status: 400,
          message: "your last time of update is less than 60 days"
        });
      } else {
        body.lastUpdate = new Date();
        await user.set(body);
        await user.save();
        return res.status(200).json({
          status: 200,
          message: "Your details has been updated Successfully"
        });
      }
    }
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "Unable to update User's details"
    });
  }
};
