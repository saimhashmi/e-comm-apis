import { body, validationResult } from "express-validator";

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
