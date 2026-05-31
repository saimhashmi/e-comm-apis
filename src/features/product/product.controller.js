import UserModel from "../user/user.model.js";
import ProductModel from "./product.model.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

export default class ProductController {
	getAllProducts(req, res) {
		// console.log("Get All Products method called");
		const products = ProductModel.get();
		// console.log(products);
		if (products.length > 0) {
			return res.status(200).json({
				success: true,
				message: "products listed below",
				data: products,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "No products to list",
				data: products,
			});
		}
	}

	getOneProduct(req, res) {
		const id = req.params.id;
		const product = ProductModel.get(id);

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
	}

	filterProduct(req, res) {
		const { minPrice, maxPrice, category } = req.query;
		const filteredProducts = ProductModel.filter(
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
		}
	}

	addProduct(req, res) {
		// console.log("Add Product method called");
		// console.log(req.body, req.body.imageUrl);
		let imageURL = "";
		if (req.file) {
			imageURL = "./uploads/" + req.file.filename;
		} else {
			imageURL = req.body.imageUrl;
		}

		const newProduct = {
			name: req.body.name,
			desc: req.body.desc,
			imageUrl: imageURL,
			category: req.body.category,
			price: parseFloat(req.body.price).toFixed(2),
			sizes: req.body.sizes,
		};

		const result = ProductModel.add(newProduct);

		if (result) {
			res.status(201).json({
				success: true,
				message: "New Product successfully added",
				data: result,
			});
		} else {
			return res.status(400).json({
				success: false,
				message: "New Product not added",
				data: result,
			});
		}
	}

	rateProduct(req, res) {
		const { productID, rating } = req.query;
		const userID = req.userID;

		// Validate userID and productID
		const user = UserModel.get().find(
			(user) => user.id === parseInt(userID),
		);
		if (!user) throw new customError("user not found", 404);

		const product = ProductModel.get().find(
			(product) => product.id === parseInt(productID),
		);
		if (!product) throw new customError("product not found", 404);

		// Model just updates, controller formats response
		ProductModel.rateProduct(userID, productID, rating);

		return res.status(200).json({
			success: true,
			data: {
				id: product.id,
				name: product.name,
				price: product.price,
				ratings: product.ratings,
			},
		});
	}
}
