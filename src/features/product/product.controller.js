import ProductModel from "./product.model.js";

const productModel = new ProductModel();

export default class ProductController {
	getAllProducts(req, res) {
		// console.log("Get All Products method called");
		const products = ProductModel.get();
		// console.log(products);
		if (products.length > 0) {
			return res.status(200).json({
				success: true,
				message: "Get All Products method called",
				data: products,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "Get All Products method called, No products to list",
				data: products,
			});
		}
	}

	addProduct(req, res) {
		res.status(200).send("POST reqquest received");
	}

	rateProduct(req, res) {}

	getOneProduct(req, res) {}
}
