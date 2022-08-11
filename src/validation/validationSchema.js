const joi = require("joi");

const merchantValidation = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    storeName: joi.string().required(),
    email: joi.string().email().lowercase().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().min(6).max(30).required()
  });


const custormerValidation = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().lowercase().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().min(6).max(30).required()
  });

module.exports = {merchantValidation, custormerValidation}

