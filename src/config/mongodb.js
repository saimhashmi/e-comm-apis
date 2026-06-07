import { MongoClient } from "mongodb";
import { customError } from "../middlewares/errorHandler.middleware.js";
import dotenv from "dotenv";
import { cli } from "winston/lib/winston/config/index.js";
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
		createCounter(client.db());
	} catch (error) {
		console.log("Error Connecting to DB", error);
		throw new customError("Error connecting to DB", 500);
	}
};

export const getDB = () => {
	return client.db();
};

const createCounter = async (db) => {
	const existingCounter = await db
		.collection("counters")
		.findOne({ _id: "cartItemId" });

	if (!existingCounter) {
		await db
			.collection("counters")
			.insertOne({ _id: "cartItemId", value: 0 });
	}
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
