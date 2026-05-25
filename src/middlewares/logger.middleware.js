// import fs from "fs";
// import path from "path";
import winston from "winston";

// const fsPromise = fs.promises;

// const writeLog = async (logMessage) => {
// 	try {
// 		await fsPromise.writeFile(
// 			path.join("logs", "Server.log"),
// 			logMessage + "\n",
// 			{
// 				flag: "a",
// 			},
// 		);
// 	} catch (err) {
// 		console.log("Error write logs to file", err);
// 	}
// };
const writeLog = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: {
		service: "request-logging",
	},
	transports: [new winston.transports.File({ filename: "logs/server.log" })],
});

const logger = (req, res, next) => {
	const startTime = Date.now();
	// let logMessage = `[${new Date().toUTCString()}]:- Request Type: ${req.method}, Route: "${req.originalUrl}", Status Code: ${res.statusCode}`;
	console.log();

	res.on("finish", () => {
		const duration = Date.now() - startTime;
		const body = { ...req.body };
		if (body.password) {
			body.password = "*".repeat(body.password.length);
		}

		const logMessage =
			new Date() +
			"\n" +
			[
				`Method: ${req.method}`,
				`Route: "${req.originalUrl}"`,
				`Body: ${JSON.stringify(body)}`,
				`Status: ${res.statusCode}`,
				`Duration: ${duration}ms`,
			].join(" | ");

		console.log(logMessage.trim());
		writeLog.info(logMessage);
	});

	next();
};

export { logger as default, writeLog };
