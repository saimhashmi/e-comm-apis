import { getDB } from "../../config/mongodb.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

export default class UserRepository {
	async signUp(newUser) {
		try {
			// 1. Get the database
			const db = await getDB("EcommDB");
			// 2. Get the collection
			const collection = await db.collection("Users");
			// 3. Insert New User in DB
			const response = await collection.insertOne(newUser);

			return response;
		} catch (error) {
			throw new customError("Something went wrong", 500);
		}
	}

	async signIn(email, password) {
		try {
			// 1. Get the database
			const db = await getDB("EcommDB");
			// 2. Get the collection
			const collection = await db.collection("Users");
			// 3. Insert New User in DB
			const response = await collection.findOne({ email, password });

			return response;
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
