const { UsersService } = require("../src/services");
const { HttpCode } = require("../src/helpers/constants");
const usersService = new UsersService();

const current = async (req, res, next) => {
  try {
    const user = await usersService.findById(req.user.id);

    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK + " OK",
      ["Content-Type"]: "application/json",
      ResponseBody: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateSub = async (req, res, next) => {
  try {
    if (!req.body.subscription) {
      next({
        Status: HttpCode.BAD_REQUEST,
        data: "Bad Request",
        message: "No subscription field",
      });
    }

    const user = await usersService.updateSub(req.user.id, req.body);

    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK + " OK",
      ["Content-Type"]: "application/json",
      ResponseBody: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { current, updateSub };
