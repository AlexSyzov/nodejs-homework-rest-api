const express = require("express");
const router = express.Router();
const usersController = require("../../src/controllers/users");
const guard = require("../../src/helpers/guard");
const {
  validateEmailResending,
} = require("../../src/validation/resendingEmail");

router
  .get("/current", guard, usersController.current)
  .patch("/", guard, usersController.updateSub)
  .post("/verify", validateEmailResending, usersController.verify);

module.exports = router;
