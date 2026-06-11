// Manage routes/paths to ProductController

// Import modules
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";
import { rateProduct } from "../../middlewares/validation.middleware.js";

// Initialize Express router
const router = express.Router();

// Initialize ProductController Class
const productController = new ProductController();

// All the paths to controller methods.
// router.get("/", productController.getAllProducts);
router.get("/", (req, res, next) => {
	productController.getAllProducts(req, res, next);
});
// router.post("/", upload.single("imageUrl"), productController.addProduct);
router.post("/", upload.single("imageUrl"), (req, res, next) => {
	productController.addProduct(req, res, next);
});
router.get("/filter", (req, res, next) => {
	productController.filterProduct(req, res, next);
});
router.get("/averagePrice", (req, res, next) => {
	productController.averagePrice(req, res, next);
});
router.get("/:id", (req, res, next) => {
	productController.getOneProduct(req, res, next);
});
router.post("/:id/rate", rateProduct, (req, res, next) => {
	productController.rateProduct(req, res, next);
});

export default router;
