const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  CustomerEmail: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    default: 100
  },
  paymentReciepts: [
    {
      type: Object
    }
  ]
});

const Payments = mongoose.model("Payments", PaymentSchema);

module.exports = Payments;
