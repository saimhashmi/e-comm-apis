import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtAuth = (req, res, next) => {
	// Read the token from auth headers or from cookies
	// const token = req.headers["authorization"];
	const token = req.cookies.jwtToken;
	// console.log(token);

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
		console.log(payload);
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
