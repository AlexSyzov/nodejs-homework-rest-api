const { UsersService, EmailService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const usersService = new UsersService();

const current = async (req, res, next) => {
  try {
    const user = await usersService.findById(req.user.id);

    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK + " OK",
      ["Content-Type"]: "application/json",
      ResponseBody: {
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
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

const verify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersService.findByEmail(email);

    if (!user) {
      return res.status(HttpCode.NOT_FOUND).json({
        Status: HttpCode.NOT_FOUND + " Not Found",
        ["Content-Type"]: "application/json",
        ResponseBody: {
          message: "You haven't registered yet",
        },
      });
    }

    if (!user.verify) {
      const emailService = new EmailService(process.env.NODE_ENV);
      await emailService.sendEmail(user.verifyToken, email, user.name);

      return res.status(HttpCode.OK).json({
        Status: HttpCode.OK + " OK",
        ["Content-Type"]: "application/json",
        ResponseBody: {
          message: "Verification email sent",
        },
      });
    }

    return res.status(HttpCode.BAD_REQUEST).json({
      Status: HttpCode.BAD_REQUEST + " Bad Request",
      ["Content-Type"]: "application/json",
      ResponseBody: {
        message: "Verification has already been passed",
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { current, updateSub, verify };
