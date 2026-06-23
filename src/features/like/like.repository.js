import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { customError } from "../../middlewares/errorHandler.middleware.js";
import { likeSchema } from "./like.schema.js";

const LikeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
	async getLikes(itemID, type) {
		return await LikeModel.find({
			likeable: new ObjectId(itemID),
			type: type,
		})
			.populate("User")
			.populate({ path: "likeable", model: type });
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
