import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		match: [/.+\@.+\../, "Please enter a valid email"],
	},
	email: { type: String, unique: true, required: true },
	password: {
		type: String,
		required: true,
		validate: function (value) {
			return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
		},
		message:
			"Password must be between 8 to 12 chararcters and have a special character",
	},
	type: {
		type: String,
		required: true,
		enum: ["Customer", "Seller", "customer", "seller"],
	},
});
