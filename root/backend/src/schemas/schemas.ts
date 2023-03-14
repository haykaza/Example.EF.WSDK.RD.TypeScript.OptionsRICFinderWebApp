const Joi = require('joi');

module.exports.findRICSchema = Joi.object({
    asset: Joi.string().required(),
    maturity: Joi.string().required(),
    strike: Joi.number().required(),
    type: Joi.string().required()
});