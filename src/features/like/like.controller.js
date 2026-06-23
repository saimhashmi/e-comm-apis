import LikeRepository from "./like.repository.js";

export default class LikeController {
	constructor() {
		this.likeRepository = new LikeRepository();
	}

	async getLikes(req, res, next) {
		const { itemID, type } = req.query;
		try {
			const likes = await this.likeRepository.getLikes(itemID, type);

			return res.status(200).json({
				success: true,
				message: "products listed below",
				data: likes,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async likeItem(req, res, next) {
		try {
			const userID = req.userID;
			console.log(req.body);
			const { likeable: itemID, type: type } = req.body;

			console.log(itemID, type, type != "Product", type != "Category");

			if (type != "Product" && type != "Category") {
				return res.status(400).send(`Invalid type: ${type}`);
			}

			let like;

			if (type == "Product") {
				like = await this.likeRepository.likeProduct(userID, itemID);
			} else {
				like = await this.likeRepository.likeCategory(userID, itemID);
			}

			if (!like) {
				throw new Error("Likes not found");
			}

			res.status(201).json({
				success: true,
				message: `Successfully liked ${type}`,
				orderId: like,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}
