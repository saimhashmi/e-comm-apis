import { customError } from "../../middlewares/errorHandler.middleware.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class ProductRepository {
	constructor() {
		this.collection = "Products";
	}

	async add(newProduct) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			const response = await collection.insertOne(newProduct);

			return response;
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async get(id = null) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);

			if (id) {
				return await collection.findOne({ _id: new ObjectId(id) });
			} else {
				return await collection.find().toArray();
			}
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async filter(minPrice, maxPrice, category) {
		try {
			// const products = await this.get();
			// return products.filter((product) => {
			// 	return (
			// 		(!minPrice || product.price >= minPrice) &&
			// 		(!maxPrice || product.price <= maxPrice) &&
			// 		(!category ||
			// 			product.category.toLowerCase() ==
			// 				category.toLowerCase())
			// 	);
			// });
			const db = getDB();
			const collection = db.collection(this.collection);
			let filteredExpression = {};
			if (minPrice) {
				filteredExpression.price = {
					$gte: parseFloat(minPrice),
				};
			}
			if (maxPrice) {
				filteredExpression.price = {
					...filteredExpression.price,
					$lte: parseFloat(maxPrice),
				};
			}
			if (category) {
				// filteredExpression.category = category;
				filteredExpression = {
					$and: [{ category: category }, filteredExpression],
				};
			}

			return await collection
				.find(filteredExpression)
				// Use of projection operator, 1 is to include & 0 is to exclude
				.project({ name: 1, price: 1, ratings: { $slice: -1 }, _id: 0 })
				.toArray();
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async rateProduct(userID, productID, rating) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			userID = new ObjectId(userID);

			// Remove existing rating entry for same user
			await collection.updateOne(
				{ _id: new ObjectId(productID) },
				{ $pull: { ratings: { userID: userID } } },
			);
			// Add new rating entry
			await collection.updateOne(
				{ _id: new ObjectId(productID) },
				{ $push: { ratings: { userID, rating } } },
			);

			return await collection.findOne({ _id: new ObjectId(productID) });
			// const product = await
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
