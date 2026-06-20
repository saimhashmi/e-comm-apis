import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	totalAmount: { type: Number, required: true },
	timeStamp: { type: Date, default: Date.now },
});
