import { getDB } from "../../config/mongodb.js";
import CartItemModel from "./cartItem.model.js";
import { ObjectId } from "mongodb";

export default class CartItemRepository {
	constructor() {
		this.collection = "cartItems";
	}

	async add(userID, productID, quantity) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			userID = new ObjectId(userID);
			productID = new ObjectId(productID);
			quantity = parseInt(quantity);
			// const existingItem = await collection.findOne({
			// 	userID: userID,
			// 	productID: productID,
			// });

			// if (existingItem) {
			// 	return await collection.updateOne(
			// 		{
			// 			userID: userID,
			// 			productID: productID,
			// 		},
			// 		{ $set: { quantity: quantity } },
			// 	);
			// } else {
			// 	return await collection.insertOne(
			// 		new CartItemModel(
			// 			userID,
			// 			productID,
			// 			quantity,
			// 		),
			// 	);
			// }
			return await collection.updateOne(
				{ userID, productID },
				{ $inc: { quantity: quantity } },
				{ upsert: true }, // This will add a new entry if not present otherwise update quantity in cart
			);
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async get(userID) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);

			return await collection
				.find({ userID: new ObjectId(userID) })
				.toArray();
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async delete(userID, cartItemID) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);

			return await collection.deleteOne({
				_id: new ObjectId(cartItemID),
				userID: new ObjectId(userID),
			});
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
