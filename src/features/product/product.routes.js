// Manage routes/paths to ProductController

// Import modules
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

// Initialize Express router
const router = express.Router();

// Initialize ProductController Class
const prodcutController = new ProductController();

// All the paths to controller methods.
router.get("/", prodcutController.getAllProducts);
router.post("/", upload.single("imageUrl"), prodcutController.addProduct);
router.get("/filter", prodcutController.filterProduct);
router.get("/:id", prodcutController.getOneProduct);

export default router;
