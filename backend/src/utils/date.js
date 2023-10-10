const timestampDatetime = (humanFormat = null) => {
	let newDate;
	if (humanFormat) newDate = new Date(humanFormat); else newDate = new Date();
	return Math.round(newDate.getTime() / 1000);
};

module.exports = {
	timestampDatetime,
};
