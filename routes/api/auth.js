const express = require("express");
const { createAccountLimiter } = require("../../src/helpers/rateLimit");
const router = express.Router();
const usersController = require("../../model/auth");
const guard = require("../../src/helpers/guard");

router
  .post("/register", createAccountLimiter, usersController.reg)
  .post("/login", usersController.login)
  .post("/logout", guard, usersController.logout);

module.exports = router;
