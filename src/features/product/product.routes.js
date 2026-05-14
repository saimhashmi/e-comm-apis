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
router.get("/", productController.getAllProducts);
router.post("/", upload.single("imageUrl"), productController.addProduct);
router.get("/filter", productController.filterProduct);
router.get("/:id", productController.getOneProduct);
router.post("/rate", rateProduct, productController.rateProduct);

export default router;
