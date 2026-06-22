import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
	rating: Number,
});
