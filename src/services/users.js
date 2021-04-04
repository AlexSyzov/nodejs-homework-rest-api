const { UsersModel } = require("../../model");

class UsersService {
  constructor() {
    this.models = {
      users: new UsersModel(),
    };
  }

  async create(body) {
    const data = await this.models.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.models.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.models.users.findById(id);
    return data;
  }

  async updateSub(userId, { subscription: sub }) {
    const data = await this.models.users.updateSub(userId, sub);
    return data;
  }
}

module.exports = UsersService;
