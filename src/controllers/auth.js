const { AuthService, UsersService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const path = require("path");
const fs = require("fs/promises");
const usersService = new UsersService();
const authService = new AuthService();
const Jimp = require("jimp");
const createFolderIfDoesNotExist = require("../helpers/createDir");
require("dotenv").config();

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
            avatar: user.avatar,
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

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);

    await authService.updateAvatar(id, avatarUrl);

    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK + " OK",
      data: `${avatarUrl}`,
    });
  } catch (e) {
    next(e);
  }
};

const saveAvatarToStatic = async (req) => {
  const id = String(req.user._id);
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const filePath = req.file.path;

  const newAvatarName = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(filePath);

  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath);

  await createFolderIfDoesNotExist(path.join(AVATARS_OF_USERS, id));

  await fs.rename(filePath, path.join(AVATARS_OF_USERS, id, newAvatarName));

  const avatarUrl = path.normalize(path.join(id, newAvatarName));

  return avatarUrl;
};

module.exports = {
  reg,
  login,
  logout,
  avatars,
};
