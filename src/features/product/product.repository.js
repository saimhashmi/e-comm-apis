import { customError } from "../../middlewares/errorHandler.middleware.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("products", productSchema);
const ReviewModel = mongoose.model("reviews", reviewSchema);
const CategoryModel = mongoose.model("categories", categorySchema);

export default class ProductRepository {
	constructor() {
		this.collection = "products";
	}

	async add(productData) {
		try {
			// const db = getDB();
			// const collection = db.collection(this.collection);
			// const response = await collection.insertOne(newProduct);

			// return response;

			// Add new Product
			console.log(productData);
			productData.category = productData.category
				.split(",")
				.map((e) => e.trim());
			console.log(productData);
			const newProduct = new ProductModel(productData);
			const savedProduct = await newProduct.save();

			// Update category
			await CategoryModel.updateMany(
				{ _id: { $in: productData.category } },
				{
					$push: { products: new ObjectId(savedProduct._id) },
				},
			);

			return savedProduct;
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
			// const db = getDB();
			// const collection = db.collection(this.collection);
			// userID = new ObjectId(userID);
			// // Remove existing rating entry for same user
			// await collection.updateOne(
			// 	{ _id: new ObjectId(productID) },
			// 	{ $pull: { ratings: { userID: userID } } },
			// );
			// // Add new rating entry
			// await collection.updateOne(
			// 	{ _id: new ObjectId(productID) },
			// 	{ $push: { ratings: { userID, rating } } },
			// );
			// return await collection.findOne({ _id: new ObjectId(productID) });

			// Check if product exists
			const productToUpdate = await ProductModel.findById(productID);
			console.log(productToUpdate);
			if (!productToUpdate) {
				throw new Error("Product not found!");
			}

			// get existing review
			const userReview = await ReviewModel.findOne({
				productID: new ObjectId(productID),
				userID: new ObjectId(userID),
			});
			if (userReview) {
				console.log(userReview);
				userReview.rating = rating;
				return await userReview.save();
			} else {
				const newReview = new ReviewModel({
					userID: new ObjectId(userID),
					productID: new ObjectId(productID),
					rating: rating,
				});
				productToUpdate.reviews.push(newReview._id);
				await productToUpdate.save();
				return await newReview.save();
			}
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
	async averageProductPricePerCategory() {
		try {
			const db = getDB();
			return await db
				.collection(this.collection)
				.aggregate([
					{
						$group: {
							_id: "$category",
							averagePrice: { $avg: "$price" },
						},
					},
				])
				.toArray();
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
