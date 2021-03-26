const express = require("express");
const router = express.Router();
const contactsController = require("../../model/contacts");
const guard = require("../../src/helpers/guard");
const {
  validateContactCreation,
  validateContactUpdate,
} = require("../../src/validation/contacts");

router.get("/", guard, contactsController.listContacts);

router.get("/:contactId", guard, contactsController.getContactById);

router.post(
  "/",
  [guard, validateContactCreation],
  contactsController.addContact
);

router.delete("/:contactId", guard, contactsController.removeContact);

router.patch(
  "/:contactId",
  [guard, validateContactUpdate],
  contactsController.updateContact
);

module.exports = router;
