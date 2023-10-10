const Joi = require('joi');

const {
	initDataScheme,
} = require('./general');

const getFavoritesValidator = Joi.object({
	initData: initDataScheme,
});

const setFavoritesValidator = Joi.object({
	initData: initDataScheme,

	month: Joi.number()
			.integer()
			.min(1)
			.max(12)
			.required(),

	placeId: Joi.number()
			.integer()
			.min(1)
			.required(),
});

module.exports = {
	getFavoritesValidator,
	setFavoritesValidator,
};
