const Joi = require('joi');

const {
	initDataScheme,
} = require('./general');

const getPlacesValidator = Joi.object({
	initData: initDataScheme,

	month: Joi.number()
			.integer()
			.min(1)
			.max(12)
			.required(),

	// nature_city: 2 (city)
	question2: Joi.number()
			.integer()
			.min(1)
			.max(2)
			.required(),

	// mountain_sea: 1 (mountain) || old_new: 2 (new)
	question3: Joi.number()
			.integer()
			.min(1)
			.max(2)
			.required(),
});

module.exports = {
	getPlacesValidator,
};
