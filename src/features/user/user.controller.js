import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

dotenv.config();

export default class UserController {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async userSignUp(req, res, next) {
		// const newUser = req.body;
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new UserModel(
				req.body.name,
				req.body.email,
				hashedPassword,
				req.body.type,
			);
			const response = await this.userRepository.signUp(newUser);

			if (response.acknowledged) {
				return res.status(201).json({
					success: response,
					message: "New user added successfully",
					user: [newUser.email],
				});
			}
		} catch (error) {
			console.log(error);
			next(error);
			// throw new customError("Something went wrong", 500);
		}
	}

	async userSignIn(req, res, next) {
		// const user = UserModel.signIn(userObj);
		let user;
		try {
			// const
			user = await this.userRepository.findUserByEmail(req.body.email);
			if (!user) {
				// return res.status(401).json({
				// 	success: false,
				// 	message: "Invalid email or password",
				// 	user: userObj.email,
				// });
				throw new customError("Invalid email or password", 401);
			} else {
				// Compare plain text password with hashed password
				const result = await bcrypt.compare(
					req.body.password,
					user.password,
				);

				if (!result) {
					throw new customError("Invalid email or password", 401);
				}

				// Fetch secret key
				const secretKey = process.env.JWT_SECRET;

				// define payload
				const payload = {
					userID: user._id,
					email: user.email,
				};

				// define token validity
				const validity = {
					expiresIn: "1h",
				};

				// Create JSON Web Token
				const token = jwt.sign(payload, secretKey, validity);

				res.cookie("jwtToken", token, { httpOnly: true });

				return res.status(200).json({
					success: true,
					message: "User logged in successfully",
					user: user.email,
					JWT: token,
				});
			}
		} catch (error) {
			console.log(error);
			next(error); // Pass to error handler middleware
		}
	}
}
