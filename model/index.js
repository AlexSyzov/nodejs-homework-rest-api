const { HttpCode } = require("../src/helpers/constants");
const { ContactsService } = require("../src/services");
const contactsService = new ContactsService();

const listContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.getAll();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);

    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
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
    const contact = await contactsService.remove(req.params);

    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          message: "contact deleted",
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
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
    const contact = await contactsService.create(req.body);

    if (contact) {
      res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
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
    const contact = await contactsService.update(req.params, req.body);

    if (contact === "No fields") {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: "missing fields",
        data: "missing fields",
      });
    }

    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
