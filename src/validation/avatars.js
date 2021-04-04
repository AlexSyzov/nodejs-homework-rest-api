const { HttpCode } = require("../helpers/constants");

module.exports.validateAvatarUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      Status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Avatar image not found",
    });
  }

  next();
};
