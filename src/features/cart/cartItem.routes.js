// Manage routes/paths to CartItemController

// Import modules
import express from "express";
import CartItemController from "./cartItem.controller.js";
import { addtoCart } from "../../middlewares/validation.middleware.js";

// Initialize Express router
const router = express.Router();

// Initialize CartItemController Class
const cartItemController = new CartItemController();

// All the paths to controller methods.
router.get("/", (req, res, next) => {
	cartItemController.getCartItems(req, res, next);
});
router.post("/", addtoCart, (req, res, next) => {
	cartItemController.addToCart(req, res, next);
});
router.delete("/:id", (req, res, next) => {
	cartItemController.deleteFromCart(req, res, next);
});

export default router;
