const { logger } = require('../services/logger');
const errorHandler = require('../services/error-handler');
const { validateData, parseDataWebApp } = require('../utils/tg-data');
const { timestampDatetime } = require('../utils/date');
const { getPlacesValidator } = require('../validators/places');

const get = async (req, res) => {
	try {
		const {
			initData,
			month,
			question2,
			question3,
		} = await getPlacesValidator.validateAsync(req.query);
		logger.debug('initData:', initData, 'month:', month, 'question2:', question2, 'question3:', question3);

		if ( ! validateData(initData)) {
			const response = {};
			response.code = 42;
			response.error = 42;
			res.json(response);
		}

		const data = parseDataWebApp(initData);
		logger.debug('data', data);

		const userId = data.user.id;

		const sql2 = `SELECT id FROM users WHERE user_id = ${userId} LIMIT 1`;
		const [ users ] = await db.query(sql2);

		if ( ! users[0]) {
			let platform = null;
			if (typeof data.platform !== 'undefined') platform = data.platform;

			let language = null;
			if (typeof data.user.language_code !== 'undefined') language = data.user.language_code;

			let allowsWriteToPM = null;
			if (typeof data.user.allows_write_to_pm !== 'undefined') allowsWriteToPM = Number(data.user.allows_write_to_pm);

			const sql3 = `INSERT INTO users SET
							created = ${timestampDatetime()},
							user_id = ${userId},
							platform = ${db.escape(platform)},
							language = ${db.escape(language)},
							allows_write_to_pm = ${allowsWriteToPM}`;
			await db.query(sql3);
		}

		let filterNameFiled;

		if (question2 === 1) filterNameFiled = 'mountain_sea'; else filterNameFiled = 'old_new';

		const sql = `SELECT countries.name_ru AS country, places.id, places.name_ru AS name, places.description_ru AS description, season, seasons.mini_description_ru AS season_mini_description, favorites.month AS favorites, video, photos
					FROM places
					LEFT JOIN countries ON countries.id = places.country_id
					LEFT JOIN seasons ON seasons.place_id = places.id AND seasons.month = ${month}
					LEFT JOIN favorites ON favorites.place_id = places.id AND favorites.month = ${month} AND user_id = ${userId}
					WHERE season != 3 AND nature_city IN (${question2}, 3) AND ${filterNameFiled} IN (${question3}, 3)`;

		const [ rows ] = await db.query(sql);
		// db.release();
		const response = {};
		response.code = 0;
		response.items = rows;
		res.json(response);
	}
	catch (err) {
		errorHandler.handleError(err, res);
	}
};

module.exports = {
	get,
};
