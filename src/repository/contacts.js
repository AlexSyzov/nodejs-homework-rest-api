const { Contact } = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll() {
    const data = await this.model.find({});
    return data;
  }

  async getById(id) {
    const data = await this.model.findOne({ _id: id });
    return data;
  }

  async create(body) {
    const data = await this.model.create(body);
    return data;
  }

  async update(id, body) {
    const data = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );

    return data;
  }

  async remove(id) {
    const data = await this.model.findByIdAndRemove({
      _id: id,
    });

    return data;
  }
}

module.exports = ContactsRepository;
