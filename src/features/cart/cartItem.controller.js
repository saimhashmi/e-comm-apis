import CartItemModel from "./cartItem.model.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

export default class CartItemController {
	getCartItems(req, res) {
		const cart = CartItemModel.get(req.userID);
		return res.status(200).json({
			success: true,
			message: "Items currently in cart",
			data: cart,
		});
	}

	addToCart(req, res) {
		const { productID, quantity } = req.query;
		const userID = req.userID;

		const cart = CartItemModel.add(userID, productID, quantity);
		return res.status(201).json({
			success: true,
			message: "Item(s) added to Cart",
			cart: cart,
		});
	}

	deleteFromCart(req, res) {
		const userID = req.userID;
		const productID = req.params.id;

		const success = CartItemModel.delete(productID, userID);

		// if (success) {
		// 	return res.status(200).json({
		// 		success: success,
		// 		message: "Item deleted successfully",
		// 	});
		// } else {
		// 	return res.status(400).json({
		// 		success: success,
		// 		message: "Unable to delete item",
		// 	});
		// }
		if (!success) {
			throw new customErrorHandler("Unable to delete item", 400);
		}

		return res.status(200).json({
			// Keep success response
			success: true,
			message: "Item deleted successfully",
		});
	}
}
