const db = require("../db");

class ContactsRepository {
  getAll() {
    return db.get("contacts").value();
  }

  getById(id) {
    const contactId = Number(id);

    return db.get("contacts").find({ id: contactId }).value();
  }

  create(body) {
    const contacts = db.get("contacts").value();
    const length = db.get("contacts").value().length;

    const id = contacts[length - 1].id + 1;

    const record = {
      id,
      ...body,
    };

    db.get("contacts").push(record).write();

    return record;
  }

  update(id, body) {
    const contactId = Number(id);

    if (Object.keys(body).length == 0) {
      return "No fields";
    }

    const record = db
      .get("contacts")
      .find({ id: contactId })
      .assign(body)
      .value();

    db.write();

    return record.id ? record : null;
  }

  remove(id) {
    const contactId = Number(id);

    const [record] = db.get("contacts").remove({ id: contactId }).write();

    return record;
  }
}

module.exports = ContactsRepository;
