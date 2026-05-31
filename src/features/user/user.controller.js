import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import { customError } from "../../middlewares/errorHandler.middleware.js";

dotenv.config();

export default class UserController {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async userSignUp(req, res) {
		// const newUser = req.body;
		const newUser = new UserModel(
			req.body.name,
			req.body.email,
			req.body.password,
			req.body.type,
		);

		try {
			const response = await this.userRepository.signUp(newUser);

			if (response.acknowledged) {
				return res.status(201).json({
					success: response,
					message: "New user added successfully",
					user: [newUser.email],
				});
			}
		} catch (error) {
			throw new customError("Something went wrong", 500);
		}
	}

	async userSignIn(req, res) {
		// const user = UserModel.signIn(userObj);
		let user;
		try {
			user = await this.userRepository.signIn(
				req.body.email,
				req.body.password,
			);

			if (!user) {
				// return res.status(401).json({
				// 	success: false,
				// 	message: "Invalid email or password",
				// 	user: userObj.email,
				// });
				throw new customError("Invalid email or password", 401);
			}

			// Fetch secret key
			const secretKey = process.env.JWT_SECRET;

			// define payload
			const payload = {
				userID: user.id,
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
		} catch (error) {
			console.log(error);
			throw new customError("Something went wrong", 500);
		}
	}
}
