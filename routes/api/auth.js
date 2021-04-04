const express = require("express");
const { createAccountLimiter } = require("../../src/helpers/rateLimit");
const router = express.Router();
const authController = require("../../src/controllers/auth");
const guard = require("../../src/helpers/guard");
const upload = require("../../src/helpers/upload");
const { validateAvatarUpload } = require("../../src/validation/avatars");

router
  .post("/register", createAccountLimiter, authController.reg)
  .post("/login", authController.login)
  .post("/logout", guard, authController.logout)
  .patch(
    "/avatars",
    [guard, upload.single("avatar"), validateAvatarUpload],
    authController.avatars
  );

module.exports = router;
