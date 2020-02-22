const Payments = require("./../models/Payment");

exports.deductAmount = async (email, amount) => {
  try {
    if ((email || amount) === "") {
      return {
        status: 400,
        message: "User's email/amount cannot be empty"
      };
    }
    const amounts = await Payments.findOne({
      CustomerEmail: email
    });

    if (!amounts) {
      throw Error();
    }

    const pay = await Payments.findOneAndUpdate(
      {
        CustomerEmail: email
      },
      {
        $set: {
          amount: amounts.amount - amount
        }
      },
      { new: true }
    );

    if (!pay) {
      throw Error();
    }

    return {
      status: 200,
      message: pay
    };
  } catch (e) {
    return {
      status: 404,
      message: "User not charged"
    };
  }
};
