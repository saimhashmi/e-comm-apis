import { getDB } from "../../config/mongodb.js";
import CartItemModel from "./cartItem.model.js";
import { ObjectId } from "mongodb";

export default class CartItemRepository {
	constructor() {
		this.collection = "CartItems";
	}

	async add(userID, productID, quantity) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			// const id = await this.getNextCounter(db);
			const newCartItem = new CartItemModel(
				new ObjectId(userID),
				new ObjectId(productID),
				parseInt(quantity),
			);
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
			// TODO: Add details of product added to Cart directly here instead of just productID, use agrregation pipeline in order.repository.js
			// Question will it be more efficient?
			return await collection.updateOne(
				{
					userID: newCartItem.userID,
					productID: newCartItem.productID,
				},
				{
					// $setOnInsert: { _id: id },
					$inc: { quantity: newCartItem.quantity },
				},
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

	async getNextCounter(db) {
		const resultDocument = await db
			.collection("Counters")
			.findOneAndUpdate(
				{ _id: "cartItemId" },
				{ $inc: { value: 1 } },
				{ returnDocument: "after" },
			);
		// console.log(resultDocument);

		return resultDocument.value;
	}
}
