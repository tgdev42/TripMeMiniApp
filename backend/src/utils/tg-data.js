const queryString = require('query-string');
const crypto = require('crypto');

const validateData = (dataWebApp) => {
	const dataObjectWebApp = queryString.parse(dataWebApp);
	const initData = queryString.parse(dataObjectWebApp.tgWebAppData);
	const hashFromTelegram = initData.hash;

	delete initData.hash;

	let dataCheckString = '';

	Object.keys(initData).sort().forEach((key) => {
		dataCheckString += `${key}=${initData[key]}\n`;
	});

	dataCheckString = dataCheckString.slice(0, -1);

	const secretKey = crypto
			.createHmac('sha256', 'WebAppData')
			.update(process.env.BOT_TOKEN)
			.digest();
	const hash = crypto
			.createHmac('sha256', secretKey)
			.update(dataCheckString)
			.digest('hex');

	return hashFromTelegram === hash;
};

const parseDataWebApp = (dataWebApp) => {
	const dataObjectWebApp = queryString.parse(dataWebApp);
	const initData = queryString.parse(dataObjectWebApp.tgWebAppData);

	return {
		platform: dataObjectWebApp.tgWebAppPlatform,
		version: dataObjectWebApp.tgWebAppVersion,
		auth_date: initData.auth_date,
		user: JSON.parse(initData.user),
	};
};

module.exports = {
	validateData,
	parseDataWebApp,
};
