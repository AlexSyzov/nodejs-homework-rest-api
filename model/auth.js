const { AuthService, UsersService } = require("../src/services");
const { HttpCode } = require("../src/helpers/constants");
const usersService = new UsersService();
const authService = new AuthService();

const reg = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await usersService.findByEmail(email);

  if (user) {
    return next({
      Status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    });
  }

  try {
    const newUser = await usersService.create({
      email,
      password,
      subscription,
    });

    return res.status(HttpCode.CREATED).json({
      Status: HttpCode.CREATED + " Created",
      ["Content-Type"]: "application/json",
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.login({ email, password });

    if (token) {
      return res.status(HttpCode.OK).json({
        Status: HttpCode.OK + " OK",
        ["Content-Type"]: "application/json",
        ResponseBody: {
          token: token,
          user: {
            email: email,
            subscription: user.subscription,
          },
        },
      });
    }

    next({
      Status: HttpCode.UNAUTHORIZED,
      data: "Unauthorized",
      message: "Email or password is wrong",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, _) => {
  const id = req.user.id;

  await authService.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ Status: HttpCode.NO_CONTENT, data: "No Content" });
};

module.exports = {
  reg,
  login,
  logout,
};
