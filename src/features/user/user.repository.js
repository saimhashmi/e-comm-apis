import { getDB } from "../../config/mongodb.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("Users", userSchema);

export default class UserRepository {
	// constructor() {
	// 	this.collection = "users";
	// }

	async signUp(user) {
		try {
			// // 1. Get the database
			// const db = getDB();
			// // 2. Get the collection
			// const collection = db.collection(this.collection);
			// // 3. Insert New User in DB
			// const response = await collection.insertOne(newUser);

			const newUser = new UserModel(user);
			// console.log(newUser);
			await newUser.save();
			// return response;
			return newUser;
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async findUserByEmail(email) {
		try {
			// // 1. Get the database
			// const db = getDB();
			// // 2. Get the collection
			// const collection = db.collection(this.collection);
			// // 3. Insert New User in DB
			// const response = await collection.findOne({ email: email });

			// return response;
			return await UserModel.findOne({ email: email });
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async resetPassword(userID, newPassword) {
		try {
			let user = await UserModel.findById(userID);

			if (user) {
				user.password = newPassword;
				await user.save();

				return user;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
