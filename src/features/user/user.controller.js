import UserModel from "./user.model.js";

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
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
				user: userObj.email,
			});
		}

		return res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: userObj.email,
		});
	}
}
