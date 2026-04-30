import fs from "fs";
import path from "path";

// const logStream = fs.createWriteStream(path.join("logs", "server.log"), {
// 	flags: "a",
// });

const logger = (req, res, next) => {
	const startTime = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - startTime;
		// const logMessage = [];
		// logMessage.push(`[${new Date().toISOString()}]`);
		// logMessage.push(`Request Type: ${req.method}`);
		// logMessage.push(`Route: ${req.originalUrl}`);
		// logMessage.push(`Status Code: ${res.statusCode}`);
		// logMessage.push(`Duration: ${duration}ms`);
		// logMessage.push(`Data Received: ${req.body}`);
		const logMessage = `[${new Date().toISOString()}]:- Request Type: ${req.method}, Route: "${req.originalUrl}", Status Code: ${res.statusCode}, Duration: ${duration}ms`;

		// logStream.write(logMessage);
		console.log(logMessage.trim());
		// console.log(logMessage.join("\n"));
	});

	next();
};

export default logger;
