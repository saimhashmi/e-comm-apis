import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "./user.model.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

dotenv.config();

export default class UserController {
	userSignUp(req, res) {
		const newUser = req.body;
		const success = UserModel.signUp(newUser);

		if (success) {
			return res.status(201).json({
				success: success,
				message: "New user added successfully",
				user: [newUser.email],
			});
		}
	}

	userSignIn(req, res) {
		const userObj = req.body;
		const user = UserModel.signIn(userObj);

		if (!user || user.password !== userObj.password) {
			// return res.status(401).json({
			// 	success: false,
			// 	message: "Invalid email or password",
			// 	user: userObj.email,
			// });
			throw new customErrorHandler("Invalid email or password", 401);
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
			user: userObj.email,
			JWT: token,
		});
	}
}
