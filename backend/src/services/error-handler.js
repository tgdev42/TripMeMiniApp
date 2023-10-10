const { BaseError, APIError } = require('../utils/error');
const { HTTP_STATUS_CODES } = require('../constants/http');
const { logger } = require('./logger');
const { MESSAGES } = require('../constants/messages');
const { KNOWN_ERRORS } = require('../constants/logs');

class ErrorHandler {
	isTrustedError(error) {
		if (error instanceof BaseError) {
			return error.isOperational;
		}

		return false;
	}

	async handleError(err, res) {
		await logger.error(
			err,
		);

		if (res) {
			let error;
			const stringError = err ? err.toString() : '';

			switch (true) {
				case err.code === HTTP_STATUS_CODES.UNAUTHORIZED: error = {
					name: MESSAGES.UNAUTHORIZED,
					message: err.message,
					code: HTTP_STATUS_CODES.UNAUTHORIZED,
				}; break;

				case KNOWN_ERRORS.validationError.test(stringError): error = {
					name: MESSAGES.BAD_REQUEST,
					message: err,
					code: HTTP_STATUS_CODES.BAD_REQUEST,
				}; break;

				case err.code === HTTP_STATUS_CODES.BAD_REQUEST: error = {
					name: MESSAGES.BAD_REQUEST,
					message: MESSAGES.INVALID_REQUEST_PARAMETERS,
					code: HTTP_STATUS_CODES.BAD_REQUEST,
				}; break;

				case err.code === HTTP_STATUS_CODES.NOT_FOUND: error = {
					name: MESSAGES.ENDPOINT_NOT_FOUND,
					message: err.message,
					code: HTTP_STATUS_CODES.NOT_FOUND,
				}; break;

				case err.code === HTTP_STATUS_CODES.BAD_REQUEST: error = {
					name: MESSAGES.BAD_REQUEST,
					message: MESSAGES.INVALID_REQUEST_PARAMETERS,
					code: HTTP_STATUS_CODES.BAD_REQUEST,
				}; break;

				default: error = {
					name: MESSAGES.INTERNAL_SERVER_ERROR,
					message: MESSAGES.INTERNAL_SERVER_ERROR,
					code: HTTP_STATUS_CODES.INTERNAL_SERVER,
				};
			}

			const httpError = new APIError(error.name, error.code, error.message);

			const code = httpError.code || HTTP_STATUS_CODES.INTERNAL_SERVER;

			const errorResponse = {
				name: httpError.name,
				message: httpError.message,
				statusCode: code,
			};

			res.status(code).send(errorResponse);
		}
	}
}

const errorHandler = new ErrorHandler();

module.exports = errorHandler;
