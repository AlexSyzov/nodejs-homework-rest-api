const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const contactCreationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  phone: Joi.string()
    .pattern(new RegExp(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}/))
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(30).optional(),
  phone: Joi.string()
    .pattern(new RegExp(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}/))
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .optional(),
}).min(1);

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message: errorMessage }] = error.details;
    return next({
      Status: HttpCode.BAD_REQUEST,
      data: "Bad Request",
      message: `Field: ${
        errorMessage.includes("phone")
          ? "phone must be a valid phone: (XXX) XXX-XXXX"
          : errorMessage.replace(/"/g, "")
      }`,
    });
  }

  next();
};

module.exports.validateContactCreation = (req, _, next) => {
  return validate(contactCreationSchema, req.body, next);
};

module.exports.validateContactUpdate = (req, _, next) => {
  return validate(contactUpdateSchema, req.body, next);
};
