import { body, query, validationResult } from "express-validator";

export const validateNewUser = async (req, res, next) => {
	const rules = [
		body("name").notEmpty().withMessage("Name is required"),
		body("email").isEmail().withMessage("Enter a valid Email Address"),
		body("password")
			.notEmpty()
			.withMessage("Password is required")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters"),
		body("type").notEmpty().withMessage("User type is required"),
	];

	await Promise.all(rules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		return res.status(400).json({
			succes: false,
			message: "One or more fields are invalid",
			errors: errorsArray,
		});
	}

	next();
};

export const validateUser = async (req, res, next) => {
	const rules = [
		body("email").isEmail().withMessage("Enter a valid Email Address"),
		body("password")
			.notEmpty()
			.withMessage("Password is required")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters"),
	];

	await Promise.all(rules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		return res.status(400).json({
			succes: false,
			message: "One or more fields are invalid",
			errors: errorsArray,
		});
	}

	next();
};

export const rateProduct = async (req, res, next) => {
	const rules = [
		body("productID").notEmpty().withMessage("Product ID is required"),
		body("rating")
			.isFloat({ min: 0.0, max: 5.0 })
			.withMessage("Rating must be b/w 0 to 5"),
	];

	await Promise.all(rules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		return res.status(400).json({
			succes: false,
			message: "One or more fields are invalid",
			errors: errorsArray,
		});
	}

	next();
};

export const addtoCart = async (req, res, next) => {
	const rules = [
		body("productID").notEmpty().withMessage("Product ID is required"),
		body("quantity")
			.isFloat({ min: 1 })
			.withMessage("Quantity must be more than 1"),
	];

	await Promise.all(rules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		return res.status(400).json({
			succes: false,
			message: "One or more fields are invalid",
			errors: errorsArray,
		});
	}

	next();
};
