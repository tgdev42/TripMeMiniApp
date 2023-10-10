const winston = require('winston');

const { ERROR_LEVELS, DEBUG_PATTERNS } = require('../constants/logs');

const formatter = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss',
	}),
	winston.format.splat(),
	winston.format.printf((info) => {
		const { timestamp, level, message } = info;

		return `${timestamp} [${level}]: ${message}`;
	}),
);

const transport = new winston.transports.Console({
	format: formatter,
});

const transformMessage = (msg) => {
	let ret = [];
	try {
		ret = msg.map((message) => {
			if (typeof message === 'object') {
				if (message.stack) {
					return message.stack.toString();
				}

				return JSON.stringify(message, null, 2);
			}
			else {
				return message;
			}
		});

	}
	catch (e) {
		ret = msg;
	}

	return ret.join(' ');
};

winston.addColors(ERROR_LEVELS.colors);

class Logger {
	constructor() {

		this.logger = winston.createLogger({
			level: process.env.LOG_LEVEL || 'info',
			levels: ERROR_LEVELS.levels,
			transports: [ transport ],
		});

		this.stream = {
			write: this.streamWrite(this.logger),
		};
	}

	trace(...msg) {
		this.logger.log('trace', transformMessage(msg));
	}

	debug(...msg) {
		this.logger.debug(transformMessage(msg));
	}

	info(...msg) {
		this.logger.info(transformMessage(msg));
	}

	warn(...msg) {
		this.logger.warn(transformMessage(msg));
	}

	error(...msg) {
		this.logger.error(transformMessage(msg));
	}

	fatal(...msg) {
		this.logger.log('fatal', transformMessage(msg));
	}

	streamWrite(logger) {
		return (msg, encoding) => {
			if (DEBUG_PATTERNS.some((pattern) => pattern.test(msg))) {
				logger.debug(msg);
			}
			else {
				logger.info(msg);
			}
		};
	}
}

const logger = new Logger();

module.exports = {
	logger,
};
