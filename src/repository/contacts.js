const { Contact } = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll(
    userId,
    { page = 1, limit = 5, sortBy, sortByDesc, filter, sub }
  ) {
    let data = await this.model.paginate(
      { owner: userId },
      {
        page,
        limit,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : "",
        populate: {
          path: "owner",
          select: "name email -_id",
        },
      }
    ); // Не нашёл, как с помощью этого можно отфильтровать сами контакты, а не только их поля

    return data;
  }

  async getById(userId, id) {
    const data = await this.model.findOne({ _id: id, owner: userId }).populate({
      path: "owner",
      select: "name email -_id",
    });

    return data;
  }

  async create(userId, body) {
    const data = await this.model.create({ ...body, owner: userId });
    return data;
  }

  async update(userId, id, body) {
    const data = await this.model.findByIdAndUpdate(
      id,
      { owner: userId },
      { ...body },
      { new: true }
    );

    return data;
  }

  async remove(userId, id) {
    const data = await this.model.findByIdAndRemove(id, {
      owner: userId,
    });

    return data;
  }
}

module.exports = ContactsRepository;
