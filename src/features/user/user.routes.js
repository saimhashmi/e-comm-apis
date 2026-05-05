// Manage routes/paths to ProductController

// Import modules
import express from "express";
import UserController from "./user.controller.js";
import {
	validateNewUser,
	validateUser,
} from "../../middlewares/validation.middleware.js";

// Initialize Express router
const router = express.Router();

// Initialize ProductController Class
const userController = new UserController();

// All the paths to controller methods.
router.post("/register", validateNewUser, userController.userSignUp);
router.post("/login", validateUser, userController.userSignIn);

export default router;
