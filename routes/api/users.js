const express = require("express");
const router = express.Router();
const usersController = require("../../model/users");
const guard = require("../../src/helpers/guard");

router
  .get("/current", guard, usersController.current)
  .patch("/", guard, usersController.updateSub);

module.exports = router;
