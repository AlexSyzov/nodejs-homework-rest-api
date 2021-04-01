const { User } = require("../src/schemas/user");

class UsersModel {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const data = await this.model.findOne({ _id: id });
    return data;
  }

  async findByEmail(email) {
    const data = await this.model.findOne({ email });
    return data;
  }

  async create(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  async updateSub(userId, sub) {
    const data = await this.model.findByIdAndUpdate(
      userId,
      { subscription: sub },
      { new: true }
    );

    return data;
  }

  async updateAvatar(id, avatar) {
    const data = await this.model.updateOne({ _id: id }, { avatar });
    return data;
  }
}

module.exports = UsersModel;
