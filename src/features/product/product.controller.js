import UserModel from "../user/user.model.js";
import ProductModel from "./product.model.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "../user/user.repository.js";

export default class ProductController {
	constructor() {
		this.productRepository = new ProductRepository();
	}

	async getAllProducts(req, res, next) {
		try {
			// console.log("Get All Products method called");
			const products = await this.productRepository.get();
			// console.log(products);
			if (products.length > 0) {
				return res.status(200).json({
					success: true,
					message: "products listed below",
					data: products,
				});
			} else {
				// return res.status(404).json({
				// 	success: false,
				// 	message: "No products to list",
				// 	data: products,
				// });
				throw new customError(`No products to list`, 404);
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async getOneProduct(req, res, next) {
		try {
			const id = req.params.id;
			const product = await this.productRepository.get(id);

			if (!product) {
				// return res.status(404).json({
				// 	success: false,
				// 	message: `Product with ID ${id} not found`,
				// 	data: product,
				// });
				throw new customError(`Product with ID ${id} not found`, 404);
			}

			return res.status(200).json({
				success: true,
				message: `Product with ID ${id} found`,
				data: product,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async filterProduct(req, res, next) {
		try {
			const { minPrice, maxPrice, category } = req.query;
			const filteredProducts = await this.productRepository.filter(
				minPrice,
				maxPrice,
				category,
			);

			if (filteredProducts.length > 0) {
				return res.status(200).json({
					success: true,
					message: "List of Filtered Products",
					data: filteredProducts,
				});
			} else {
				return res.status(404).json({
					success: false,
					message: "List of Filtered Products, No products to list",
					data: filteredProducts,
				});
				throw new customError(
					"List of Filtered Products, No products to list",
					404,
				);
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async addProduct(req, res, next) {
		// console.log("Add Product method called");
		// console.log(req.body, req.body.imageUrl);
		try {
			let imageURL = "";
			if (req.file) {
				imageURL = "./uploads/" + req.file.filename;
			} else {
				imageURL = req.body.imageUrl;
			}
			const stock =
				req.body.stock !== undefined ? parseInt(req.body.stock) : 20;
			const newProduct = new ProductModel(
				req.body.name,
				req.body.desc,
				imageURL,
				req.body.category,
				parseFloat(req.body.price),
				req.body.sizes,
				stock,
			);

			const result = await this.productRepository.add(newProduct);

			if (result.acknowledged) {
				res.status(201).json({
					success: true,
					message: "New Product successfully added",
					data: newProduct,
				});
			}
			// else {
			// return res.status(400).json({
			// 	success: false,
			// 	message: "New Product not added",
			// 	data: newProduct,
			// });
			// }
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async rateProduct(req, res, next) {
		try {
			const productID = req.params.id; // Get product ID from route parameter
			const { rating } = req.body; // Get rating from request body
			const userID = req.userID;

			// Validate userID and productID
			// const user = UserModel.get().find(
			// 	(user) => user.id === parseInt(userID),
			// );
			// if (!user) throw new customError("user not found", 404);

			// const product = await this.productRepository.get(productID);
			// if (!product) throw new customError("product not found", 404);

			// Model just updates, controller formats response
			const product = await this.productRepository.rateProduct(
				userID,
				productID,
				parseFloat(rating),
			);

			return res.status(200).json({
				success: true,
				data: product,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async averagePrice(req, res, next) {
		try {
			const result =
				await this.productRepository.averageProductPricePerCategory();

			return res.status(200).send(result);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}
