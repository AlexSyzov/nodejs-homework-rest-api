const { UsersModel } = require("../../model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.models = {
      users: new UsersModel(),
    };
  }

  async login({ email, password }) {
    const user = await this.models.users.findByEmail(email);

    if (!user || !user.validatePassword(password))
      return { user: null, token: null };

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await this.models.users.updateToken(id, token);

    return { user, token };
  }

  async logout(id) {
    const data = await this.models.users.updateToken(id, null);
    return data;
  }

  async updateAvatar(id, avatar, imgCloudId) {
    const data = await this.models.users.updateAvatar(id, avatar, imgCloudId);
    return data;
  }
}

module.exports = AuthService;
