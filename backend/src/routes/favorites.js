const { logger } = require('../services/logger');
const errorHandler = require('../services/error-handler');
const { getFavoritesValidator, setFavoritesValidator } = require('../validators/favorites');
const { validateData, parseDataWebApp } = require('../utils/tg-data');
const { sendResponse } = require('../utils/send-response');
const { timestampDatetime } = require('../utils/date');

const get = async (req, res) => {
	try {
		const {
			initData,
		} = await getFavoritesValidator.validateAsync(req.query);
		// logger.debug('initData:', initData);

		if ( ! validateData(initData)) {
			return sendResponse(res, {
				error: 42,
			});
		}

		const data = parseDataWebApp(initData);
		// logger.debug('data', data);

		const userId = data.user.id;

		const sql = `SELECT countries.name_ru AS country, places.id, places.name_ru AS name, places.description_ru AS description, season, seasons.mini_description_ru AS season_mini_description, favorites.month AS favorites, video, photos
						FROM favorites
						LEFT JOIN places ON places.id = favorites.place_id
						LEFT JOIN countries ON countries.id = places.country_id
						LEFT JOIN seasons ON seasons.place_id = places.id AND seasons.month = favorites.month
						WHERE user_id = ${userId}`;
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

const set = async (req, res) => {
	try {
		const {
			initData,
			placeId,
			month,
		} = await setFavoritesValidator.validateAsync(req.query);
		// logger.debug('initData:', initData, 'placeId:', placeId, 'month:', month);

		if ( ! validateData(initData)) {
			return sendResponse(res, {
				error: 42,
			});
		}

		const data = parseDataWebApp(req.query.initData);
		// logger.debug('data', data);

		const userId = data.user.id;
		const sql = `SELECT id FROM favorites WHERE
						user_id = ${userId}
						AND place_id = ${placeId}
						AND month = ${month}
					LIMIT 1`;
		const [ hasFavorite ] = await db.query(sql);

		if ( ! hasFavorite[0]) {
			const sql = `INSERT INTO favorites SET
							created = ${timestampDatetime()},
							user_id = ${userId},
							place_id = ${placeId},
							month = ${month}`;
			await db.query(sql);
			// db.release();

			return sendResponse(res, {
				code: 1,
			});
		}
		else {
			// db.release();

			sendResponse(res, {
				error: 16,
			});
		}
	}
	catch (err) {
		errorHandler.handleError(err, res);
	}
};

const remove = async (req, res) => {
	try {
		const {
			initData,
			placeId,
			month,
		} = await setFavoritesValidator.validateAsync(req.query);
		// logger.debug('initData:', initData, 'placeId:', placeId, 'month:', month);

		if ( ! validateData(initData)) {
			return sendResponse(res, {
				error: 42,
			});
		}

		const data = parseDataWebApp(req.query.initData);
		// logger.debug('data', data);

		const userId = data.user.id;
		const sql = `DELETE FROM favorites WHERE
						user_id = ${userId}
						AND place_id = ${placeId}
						AND month = ${month}`;
		await db.query(sql);
		// db.release();

		sendResponse(res, {
			code: 1,
		});
	}
	catch (err) {
		errorHandler.handleError(err, res);
	}
};

module.exports = {
	get,
	set,
	remove,
};
