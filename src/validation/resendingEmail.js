const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const emailResendingSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message: errorMessage }] = error.details;
    return next({
      Status: HttpCode.BAD_REQUEST,
      data: "Bad Request",
      message: errorMessage.replace(/"/g, ""),
    });
  }

  next();
};

module.exports.validateEmailResending = (req, _, next) => {
  return validate(emailResendingSchema, req.body, next);
};
