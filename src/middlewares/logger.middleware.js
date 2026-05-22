import fs from "fs";
import path from "path";

const fsPromise = fs.promises;

// const logStream = fs.createWriteStream(path.join("logs", "server.log"), {
// 	flags: "a",
// });
const writeLog = async (logMessage) => {
	try {
		await fsPromise.writeFile(path.join("logs", "Server.log"), logMessage, {
			flag: "a",
		});
	} catch (err) {
		console.log("Error write logs to file", err);
	}
};

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
		writeLog(logMessage);
	});

	next();
};

export default logger;
