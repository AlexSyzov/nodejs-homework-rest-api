const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: [30, "Name must contain a maximum of 30 chars!"],
      required: [true, "Contact name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact };
