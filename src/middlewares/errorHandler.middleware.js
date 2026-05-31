import { writeLog } from "./logger.middleware.js";

export class customError extends Error {
	constructor(errorMessage, statusCode) {
		super(errorMessage);
		this.statusCode = statusCode;
	}
}

export const errorHandler = (err, req, res, next) => {
	writeLog.error({
		message: err.message,
		stack: err.stack,
		url: req.path,
		method: req.method,
	});

	if (err instanceof customError) {
		res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	} else {
		res.status(500).json({
			success: false,
			message: "Oops! Something went wrong... Please try again later!",
		});
	}
};
