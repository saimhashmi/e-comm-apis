import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	imageUrl: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	sizes: { type: [String], required: true },
	stock: {
		type: Number,
		min: 20,
		default: 20,
	},
});
