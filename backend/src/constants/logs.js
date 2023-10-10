const ERROR_LEVELS = {
	levels: {
		trace: 5,
		debug: 4,
		info: 3,
		warn: 2,
		error: 1,
		fatal: 0,
	},
	colors: {
		trace: 'white',
		debug: 'green',
		info: 'green',
		warn: 'yellow',
		error: 'red',
		fatal: 'red',
	},
};

const KNOWN_ERRORS = {
	validationError: /ValidationError/,
};

module.exports = {
	ERROR_LEVELS,
	KNOWN_ERRORS,
};
