import { getDB, getClient } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import OrderModel from "./order.model.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

export default class OrderRepository {
	constructor() {
		this.collection = "Orders";
	}

	async placeOrder(userID) {
		const client = getClient();
		const session = client.startSession();
		try {
			const db = getDB();
			await session.startTransaction();
			// Get Cart Items and calculate total amount
			const items = await this.getCartDetailsForCheckoutCalculation(
				userID,
				session,
			);
			const totalAmount = items.reduce(
				(acc, item) => acc + item.totalAmount,
				0,
			);
			// console.log(totalAmount);

			// Create an order record
			const order = new OrderModel(
				new ObjectId(userID),
				totalAmount,
				new Date(),
			);

			const createOrder = await db
				.collection(this.collection)
				.insertOne(order, { session });
			console.log(createOrder);

			// reduce the stock
			for (let item of items) {
				await db
					.collection("Products")
					.updateOne(
						{ _id: item.productID },
						{ $inc: { stock: -item.quantity } },
						{ session },
					);
			}
			// throw new customError("Forcing error here", 500);
			// clear the cart items
			await db
				.collection("CartItems")
				.deleteMany({ userID: new ObjectId(userID) }, { session });

			await session.commitTransaction();
			await session.endSession();
			return createOrder;
		} catch (error) {
			console.log(error);
			await session.abortTransaction();
			await session.endSession();
			throw new customError("Something went wrong", 500);
		}
	}

	async getCartDetailsForCheckoutCalculation(userID, session) {
		try {
			const db = getDB();

			const items = await db
				.collection("CartItems")
				.aggregate(
					[
						// Get cart items for the user
						{
							$match: { userID: new ObjectId(userID) },
						},
						// Get the products from products collection
						{
							$lookup: {
								from: "Products", // Foreign collection name "Prodcuts"
								localField: "productID", // Field name in CartItems
								foreignField: "_id", // Foreign Field name in Prodcuts
								as: "productInfo", // Adding "productInfo as field name in our output"
							},
						},
						// // Unwind the productInfo
						{
							$unwind: "$productInfo",
						},
						// // Calculate totalAmount for each CartItem
						{
							$addFields: {
								totalAmount: {
									$multiply: [
										"$productInfo.price",
										"$quantity",
									],
								},
							},
						},
					],
					{ session },
				)
				// .find({ userID: new ObjectId(userID) })
				.toArray();
			console.log(items);
			return items;
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
