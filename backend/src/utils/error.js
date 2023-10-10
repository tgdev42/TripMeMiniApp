const { HTTP_STATUS_CODES } = require('../constants/http');
const { MESSAGES } = require('../constants/messages');

class BaseError extends Error {
	constructor(name, description, code, isOperational) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.code = code;
		this.description = description;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}

class APIError extends BaseError {
	constructor(
			name,
			code = HTTP_STATUS_CODES.INTERNAL_SERVER,
			description = MESSAGES.INTERNAL_SERVER_ERROR,
	) {
		super(name, description, code, true);
	}
}

class HTTP400Error extends BaseError {
	constructor(description = MESSAGES.BAD_REQUEST) {
		super(MESSAGES.BAD_REQUEST, description, HTTP_STATUS_CODES.BAD_REQUEST);
	}
}

class HTTP401Error extends BaseError {
	constructor(description = MESSAGES.UNAUTHORIZED) {
		super(MESSAGES.UNAUTHORIZED, description, HTTP_STATUS_CODES.UNAUTHORIZED);
	}
}
class HTTP404Error extends BaseError {
	constructor(description = MESSAGES.API_NOT_FOUND) {
		super(MESSAGES.ENDPOINT_NOT_FOUND, description, HTTP_STATUS_CODES.NOT_FOUND);
	}
}

module.exports = {
	BaseError,
	APIError,
	HTTP400Error,
	HTTP401Error,
	HTTP404Error,
};
