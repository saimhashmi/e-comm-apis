import { getDB } from "../../config/mongodb.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

export default class UserRepository {
	constructor() {
		this.collection = "Users";
	}

	async signUp(newUser) {
		try {
			// 1. Get the database
			const db = getDB();
			// 2. Get the collection
			const collection = db.collection(this.collection);
			// 3. Insert New User in DB
			const response = await collection.insertOne(newUser);

			return response;
		} catch (error) {
			throw new customError("Something went wrong", 500);
		}
	}

	async findUserByEmail(email) {
		try {
			// 1. Get the database
			const db = getDB();
			// 2. Get the collection
			const collection = db.collection(this.collection);
			// 3. Insert New User in DB
			const response = await collection.findOne({ email: email });

			return response;
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
