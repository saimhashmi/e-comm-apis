import OrderRepository from "./order.repository.js";

export default class OrderController {
	constructor() {
		this.orderRepository = new OrderRepository();
	}

	async placeOrder(req, res, next) {
		try {
			const userID = req.userID;
			const order = await this.orderRepository.placeOrder(userID);

			if (order.acknowledged) {
				res.status(201).json({
					success: true,
					message: "Order successfully placed",
					orderId: order.insertedId,
				});
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}
