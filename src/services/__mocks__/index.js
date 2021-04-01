const { contacts, users } = require("./testData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAll = jest.fn(
  (userId, { sortBy, sortByDesc, filter, limit = "5", page = "1" }) => {
    return { contacts, total: contacts.length, limit, page };
  }
);

const getById = jest.fn((userId, { contactId }) => {
  const contact = contacts.find((el) => String(el._id) === String(contactId));

  return contact;
});

const create = jest.fn((body) => {
  const newContact = { ...body, _id: "5f8382425ba83a4f1829ca5d" };
  contacts.push(newContact);
  return newContact;
});

const update = jest.fn((userId, { contactId }, body) => {
  let contact = contacts.find((el) => String(el._id) === String(contactId));

  if (contact) {
    contact = { ...contact, ...body };
  }

  return contact;
});

const remove = jest.fn((userId, { contactId }) => {
  const index = contacts.findIndex(
    (el) => String(el._id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }

  const [contact] = contacts.splice(index, 1);
  return contact;
});

const ContactsService = jest.fn().mockImplementation(() => {
  return {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
  };
});

const findByEmail = jest.fn((email) => {
  const user = users.find((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const user = users.find((el) => String(el._id) === String(id));
  return user;
});

const createUser = jest.fn(({ name = "Guest", email, password }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  const newUser = {
    name,
    email,
    password: pass,
    _id: "604780b0b33f593b5866d7ad",
    validatePassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };

  users.push(newUser);
  return newUser;
});

const UsersService = jest.fn().mockImplementation(() => {
  return {
    findByEmail: findByEmail,
    findById: findById,
    updateSub: jest.fn(),
    create: createUser,
  };
});

const login = jest.fn(({ email, password }) => {
  const user = users.find((el) => String(el.email) === String(email));

  if (!user || !user.validatePassword(password)) {
    return { user: null, token: null };
  }

  const id = user._id;

  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return { user, token };
});

const AuthService = jest.fn().mockImplementation(() => {
  return {
    login: login,
    logout: jest.fn(),
    updateAvatar: jest.fn(),
  };
});

module.exports = {
  ContactsService,
  UsersService,
  AuthService,
};
