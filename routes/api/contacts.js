const express = require("express");
const router = express.Router();
const contactsController = require("../../model");
const {
  validateContactCreation,
  validateContactUpdate,
} = require("../../src/validation/contacts");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateContactCreation, contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.patch(
  "/:contactId",
  validateContactUpdate,
  contactsController.updateContact
);

module.exports = router;
