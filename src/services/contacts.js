const { ContactsModel } = require("../../model");

class ContactsService {
  constructor() {
    this.models = {
      contacts: new ContactsModel(),
    };
  }

  async getAll(userId, query) {
    const data = await this.models.contacts.getAll(userId, query);

    const { docs: contacts, totalDocs: total, limit, offset } = data;
    return { contacts, total, limit, offset };
  }

  async getById(userId, { contactId }) {
    const data = await this.models.contacts.getById(userId, contactId);
    return data;
  }

  async create(userId, body) {
    const data = await this.models.contacts.create(userId, body);
    return data;
  }

  async update(userId, { contactId }, body) {
    const data = await this.models.contacts.update(userId, contactId, body);

    return data;
  }

  async remove(userId, { contactId }) {
    const data = await this.models.contacts.remove(userId, contactId);
    return data;
  }
}

module.exports = ContactsService;
