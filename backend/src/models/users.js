const { timestampDatetime } = require('../utils/date');

const saveUser = async (userId, data) => {
	const sql2 = `SELECT id FROM users WHERE user_id = ${userId} LIMIT 1`;
	const [ users ] = await db.query(sql2);

	if ( ! users[0]) {
		let platform = null;
		if (typeof data.platform !== 'undefined') platform = data.platform;

		let language = null;
		if (typeof data.user.language_code !== 'undefined') language = data.user.language_code;

		let allowsWriteToPM = null;
		if (typeof data.user.allows_write_to_pm !== 'undefined') allowsWriteToPM = Number(data.user.allows_write_to_pm);

		let firstName = null;
		if (typeof data.user.first_name !== 'undefined') firstName = data.user.first_name;

		let lastName = null;
		if (typeof data.user.last_name !== 'undefined') lastName = data.user.last_name;

		let username = null;
		if (typeof data.user.username !== 'undefined') username = data.user.username;

		let isPremium = 0;
		if (typeof data.user.is_premium !== 'undefined') isPremium = Number(data.user.is_premium);

		const sql = `INSERT INTO users SET
						created = ${timestampDatetime()},
						user_id = ${userId},
						platform = ${db.escape(platform)},
						language = ${db.escape(language)},
						allows_write_to_pm = ${allowsWriteToPM},
						first_name = ${db.escape(firstName)},
						last_name = ${db.escape(lastName)},
						username = ${db.escape(username)},
						is_premium = ${isPremium}`;
		await db.query(sql);
	}
};

module.exports = {
	saveUser,
};
