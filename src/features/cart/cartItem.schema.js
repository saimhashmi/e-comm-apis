import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	productID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: { type: Number, required: true },
});
