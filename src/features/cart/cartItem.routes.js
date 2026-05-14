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
router.get("/", cartItemController.getCartItems);
router.post("/add", addtoCart, cartItemController.addToCart);
router.delete("/delete/:id", cartItemController.deleteFromCart);

export default router;
