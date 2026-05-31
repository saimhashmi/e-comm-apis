import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import { customError } from "../middlewares/errorHandler.middleware.js";

dotenv.config();

const connectionURL = process.env.MONGODB || process.env.MongoDB_Connection_URL;
console.log(connectionURL);
const options = {
	serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
};

// export const connectToMongoDB = () => {
// 	MongoClient.connect(connectionURL, options)
// 		.then((client) => {
// 			console.log("Connected to MongoDB");
// 		})
// 		.catch((err) => {
// 			console.log("Error Connecting to DB", err);
// 		});
// };

let client;

export const connectToMongoDB = async () => {
	try {
		client = await MongoClient.connect(connectionURL, options);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error Connecting to DB", error);
		throw new customError("Error connecting to DB", 500);
	}
};

export const getDB = (dbName) => {
	return client.db(dbName);
};
