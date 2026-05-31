import { MongoClient } from "mongodb";
import { customError } from "../middlewares/errorHandler.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const connectionURL = process.env.MONGODB || process.env.MongoDB_Connection_URL;
console.log(connectionURL);
const options = {
	serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
};

let client;

export const connectToMongoDB = async () => {
	try {
		client = await MongoClient.connect(connectionURL, options);
		console.log("Connected to database:", client.s.url);
	} catch (error) {
		console.log("Error Connecting to DB", error);
		throw new customError("Error connecting to DB", 500);
	}
};

export const getDB = (dbName) => {
	return client.db(dbName);
};

export const closeMongoDBConnection = async () => {
	try {
		if (client) {
			await client.close();
			console.log("MongoDB connection closed");
		} else {
			console.warn("MongoDB client not available for closing");
		}
	} catch (err) {
		console.error("Error closing MongoDB connection:", err);
	}
};
