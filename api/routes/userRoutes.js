const express = require("express");

const authenticate = require("./../utilities/authenticator");
const {
  createUser,
  loginUser,
  verifyUserAccount,
  resetUserPassword,
  changeUserPassword,
  changeUserDetails
} = require("./../controllers/users");
const { UpdatePayment, fetchPayment } = require("./../controllers/Payment");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/:email/:token", verifyUserAccount);

router.post("/reset-password", resetUserPassword);

router.patch("/password/:id", changeUserPassword);

router.use(authenticate);

router.patch("/change-details", changeUserDetails);

router.patch("/fund", UpdatePayment);

router.get("/payments", fetchPayment);

module.exports = router;
