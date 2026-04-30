// Manage routes/paths to ProductController

// Import modules
import express from "express";
import ProductController from "./product.controller.js";

// Initialize Express router
const router = express.Router();

// Initialize ProductController Class
const prodcutController = new ProductController();

// All the paths to controller methods.
router.get("/", prodcutController.getAllProducts);
router.post("/", prodcutController.addProduct);

export default router;
