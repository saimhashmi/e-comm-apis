import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	likeable: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: "type", // Adding multiple references
	},
	type: {
		type: String,
		enum: ["Product", "Category"],
	},
})
	.pre("save", function (next) {
		console.log("New like coming in");
		next;
	})
	.post("save", function (doc) {
		console.log("like is saved");
		console.log(doc);
	});
// .pre("find", function (next) {
// 	console.log("retrieving like");
// 	next;
// })
// .post("find", function (doc) {
// 	console.log("find is successfull");
// 	console.log(doc);
// });
