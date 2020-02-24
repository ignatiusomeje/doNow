const Payments = require("./../models/Payment");

exports.fetchPayment = async (req, res, next) => {
  try {
    if (req.body.user.message.email === "") {
      return res.status(400).json({
        status: 400,
        message: "User's email cannot be empty"
      });
    }
    const amounts = await Payments.findOne({
      CustomerEmail: req.body.user.message.email
    });

    if (!amounts) {
      throw Error();
    }

    return res.status(200).json({
      status: 200,
      message: amounts
    });
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "Payment Retrival failed"
    });
  }
};

exports.UpdatePayment = async (req, res, next) => {
  try {
    if ((req.body.user.message.email || req.body.amount) === "") {
      return res.status(400).json({
        status: 400,
        message: "User's email or amount cannot be empty"
      });
    } else if (req.body.response.status !== "success") {
      return res.status(403).json({
        status: 403,
        message: "No Payment has been made"
      });
    }
    const amounts = await Payments.findOne({
      CustomerEmail: req.body.user.message.email
    });

    if (!amounts) {
      throw Error();
    }

    const pay = await Payments.findOneAndUpdate(
      {
        CustomerEmail: req.body.user.message.email
      },
      {
        $set: {
          amount: amounts.amount + req.body.amount,
          $push: {
            paymentReciepts: req.body.response
          }
        }
      },
      { new: true }
    );

    if (!pay) {
      throw Error();
    }

    return res.status(200).json({
      status: 200,
      message: pay
    });
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "Payment Update Failed"
    });
  }
};
