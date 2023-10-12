const sendResponse = (res, data) => {
	const response = { ...data };

	response.code = response.error || 1;

	res.json(response);
};

module.exports = {
	sendResponse,
};
