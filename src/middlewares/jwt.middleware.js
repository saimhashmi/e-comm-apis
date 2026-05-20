import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtAuth = (req, res, next) => {
	// Read the token from auth headers or from cookies
	// const token = req.headers["authorization"];
	// const token = req.cookies.jwtToken;
	// console.log(req.headers);
	// console.log(req.headers["authorization"]);
	// console.log(req.cookies.jwtToken);
	const token = req.cookies.jwtToken || req.headers["authorization"];
	console.log(token);

	// If no token, return error
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized, no JWT provided",
		});
	}

	// Fetch secret key
	const secretKey = process.env.JWT_SECRET;

	// Check if token is valid
	try {
		const payload = jwt.verify(token, secretKey);
		// for rate product and cart item controller
		req.userID = payload.userID;
		// console.log(payload);
	} catch (error) {
		// return error
		return res.status(401).json({
			success: false,
			message: `Unauthorized, ${error}`,
		});
	}

	// Call next middleware
	next();
};

export default jwtAuth;
