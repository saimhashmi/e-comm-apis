// import modules
import express from "express";
import OrderController from "./order.controller.js";

// Initialize Express router
const router = express.Router();

// Initialize CartItemController Class
const orderController = new OrderController();

// All the paths to controller methods.
router.post("/", (req, res, next) => {
	orderController.placeOrder(req, res, next);
});

export default router;
