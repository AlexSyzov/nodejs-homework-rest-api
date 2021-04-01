const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const contacts = await contactsService.getAll(userId, req.query);

    res.status(HttpCode.OK).json({
      Status: HttpCode.OK + " Success",
      ["Content-Type"]: "application/json",
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await contactsService.getById(userId, req.params);

    if (contact) {
      res.status(HttpCode.OK).json({
        Status: HttpCode.OK + " Success",
        ["Content-Type"]: "application/json",
        data: {
          contact,
        },
      });
    } else {
      return next({
        Status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await contactsService.remove(userId, req.params);

    if (contact) {
      res.status(HttpCode.OK).json({
        Status: HttpCode.OK + " Success",
        ["Content-Type"]: "application/json",
        data: {
          message: "contact deleted",
        },
      });
    } else {
      return next({
        Status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await contactsService.create(userId, req.body);

    if (contact) {
      res.status(HttpCode.CREATED).json({
        Status: HttpCode.CREATED + " Created",
        ["Content-Type"]: "application/json",
        data: {
          contact,
        },
      });
    } else {
      return next({
        Status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await contactsService.update(userId, req.params, req.body);

    if (contact) {
      res.status(HttpCode.OK).json({
        Status: HttpCode.OK + " OK",
        ["Content-Type"]: "application/json",
        data: {
          contact,
        },
      });
    } else {
      return next({
        Status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next({
      Status: HttpCode.NOT_FOUND,
      message: "Not found",
      data: "Not found",
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
