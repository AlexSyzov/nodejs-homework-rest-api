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
  name: Joi.string().alphanum().min(1).max(30).optional(),
  phone: Joi.string()
    .pattern(new RegExp(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}/))
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .optional(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: "missing required name field",
      data: "Bad Request",
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
