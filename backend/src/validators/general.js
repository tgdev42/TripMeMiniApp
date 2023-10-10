const Joi = require('joi');

const initDataScheme = Joi.string()
		.required();

module.exports = {
	initDataScheme,
};
