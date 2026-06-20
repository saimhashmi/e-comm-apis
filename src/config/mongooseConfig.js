import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB || process.env.MongoDB_Connection_URL;

const options = {
	serverSelectionTimeoutMS: 20000, // Timeout after 20 seconds
	// New code to connect to mongodb atlas server
	serverApi: {
		version: ServerApiVersion.v1,
		// strict: true,
		deprecationErrors: true,
	},
	maxPoolSize: 10,
};

export const connectUsingMongoose = async () => {
	try {
		await mongoose.connect(url, options);
		console.log("Connection established to MongoDB");
	} catch (error) {
		console.log("Error Connecting to DB", error);
		throw new customError("Error connecting to DB", 500);
	}
};

export const closeMongoDBConnection = async () => {
	try {
		if (mongoose.connection.readyState !== 0) {
			await mongoose.connection.close();
			console.log("MongoDB connection closed");
		} else {
			console.warn(
				"Mongoose connection already closed or not established",
			);
		}
	} catch (err) {
		console.error("Error closing MongoDB connection:", err);
		throw new customError("Error connecting to DB", 500);
	}
};
