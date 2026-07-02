import mongoose, { model } from "mongoose";
import { ObjectId } from "mongodb";
import { customError } from "../../middlewares/errorHandler.middleware.js";
import { likeSchema } from "./like.schema.js";
import { populate } from "dotenv";

const LikeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
	async getLikes(itemID, type) {
		const targetModel =
			type.toLowerCase() === "product" ? "products" : "categories";

		if (targetModel === "categories") {
			return await LikeModel.find({
				likeable: new ObjectId(itemID),
				type: type,
			})
				.populate("user")
				.populate({
					path: "likeable",
					model: targetModel,
					populate: {
						path: "products",
						model: "products",
						populate: {
							path: "category",
							model: "categories",
							select: "name",
						},
					},
				});
		} else {
			return await LikeModel.find({
				likeable: new ObjectId(itemID),
				type: type,
			})
				.populate("user")
				.populate({
					path: "likeable",
					model: targetModel,
					populate: {
						path: "reviews",
						model: "reviews",
						populate: {
							path: "userID",
							model: "users",
							select: "email",
						},
						populate: {
							path: "productID",
							model: "products",
							select: "name",
						},
					},
				});
		}
	}

	async likeProduct(userID, productID) {
		try {
			const newLike = new LikeModel({
				user: userID,
				likeable: new ObjectId(productID),
				type: "Product",
			});

			return await newLike.save();
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}

	async likeCategory(userID, categoryID) {
		try {
			const newLike = new LikeModel({
				user: userID,
				likeable: new ObjectId(categoryID),
				type: "Category",
			});

			return await newLike.save();
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
