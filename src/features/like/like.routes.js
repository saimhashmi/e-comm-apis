// Import modules
import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// Initialize Express router
const router = express.Router();

// Initialize ProductController Class
const likeController = new LikeController();

router.get("/", (req, res, next) => {
	likeController.getLikes(req, res, next);
});
router.post("/", (req, res, next) => {
	likeController.likeItem(req, res, next);
});

export default router;
