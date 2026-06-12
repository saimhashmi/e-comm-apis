import CartItemModel from "./cartItem.model.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";
import CartItemRepository from "./cartItem.repository.js";

export default class CartItemController {
	constructor() {
		this.cartItemRepository = new CartItemRepository();
	}

	async getCartItems(req, res, next) {
		try {
			const cart = await this.cartItemRepository.get(req.userID);
			return res.status(200).json({
				success: true,
				message: "Items currently in cart",
				data: cart,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async addToCart(req, res, next) {
		try {
			const { productID, quantity } = req.body;
			const userID = req.userID;

			const result = await this.cartItemRepository.add(
				userID,
				productID,
				quantity,
			);

			if (result.acknowledged) {
				return res.status(201).json({
					success: result.acknowledged,
					message: "Item added to cart successfully",
				});
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async deleteFromCart(req, res, next) {
		try {
			const userID = req.userID;
			const cartItemID = req.params.id;

			const result = await this.cartItemRepository.delete(
				userID,
				cartItemID,
			);
			console.log(result);

			if (result.deletedCount > 0) {
				return res.status(200).json({
					// Keep success response
					success: result.acknowledged,
					message: "Item deleted from Cart successfully",
				});
			} else {
				throw new customError("No item to delete", 404);
			}
		} catch (error) {
			console.log(error);
			next(error);
		}

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
	}
}
