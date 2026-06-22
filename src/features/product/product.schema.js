import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	imageUrl: { type: String, required: true },
	// category: { type: String, required: true },
	price: { type: Number, required: true },
	sizes: { type: [String], required: true },
	stock: {
		type: Number,
		default: 20,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
		},
	],
	category: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	],
});
