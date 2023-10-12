const { logger } = require('../services/logger');
const errorHandler = require('../services/error-handler');
const { validateData, parseDataWebApp } = require('../utils/tg-data');
const { getPlacesValidator } = require('../validators/places');
const { sendResponse } = require('../utils/send-response');
const { saveUser } = require('../models/users');

const get = async (req, res) => {
	try {
		const {
			initData,
			month,
			question2,
			question3,
		} = await getPlacesValidator.validateAsync(req.query);
		// logger.debug('initData:', initData, 'month:', month, 'question2:', question2, 'question3:', question3);

		if ( ! validateData(initData)) {
			return sendResponse(res, {
				error: 42,
			});
		}

		const data = parseDataWebApp(initData);
		logger.debug('user:', data.user);

		const userId = data.user.id;

		await saveUser(userId, data);

		let filterNameFiled;

		if (question2 === 1) filterNameFiled = 'mountain_sea'; else filterNameFiled = 'old_new';

		const sql = `SELECT countries.name_ru AS country, places.id, places.name_ru AS name, places.description_ru AS description, season, seasons.mini_description_ru AS season_mini_description, favorites.month AS favorites, video, photos
					FROM places
					LEFT JOIN countries ON countries.id = places.country_id
					LEFT JOIN seasons ON seasons.place_id = places.id AND seasons.month = ${month}
					LEFT JOIN favorites ON favorites.place_id = places.id AND favorites.month = ${month} AND user_id = ${userId}
					WHERE season != 3 AND nature_city IN (${question2}, 3) AND ${filterNameFiled} IN (${question3}, 3)`;

		const [ items ] = await db.query(sql);
		// db.release();

		sendResponse(res, {
			items,
		});
	}
	catch (err) {
		errorHandler.handleError(err, res);
	}
};

module.exports = {
	get,
};
