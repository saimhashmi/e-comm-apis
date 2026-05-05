import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
	// 1. Check if authorization header is empty.
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(401).json({
			success: false,
			message: "No auth details found",
		});
	}
	// console.log(authHeader);

	// 2. Extract credentials from auth header. [Basic asfhbsdabgiahwesbfgwelbfjk8237y4823]
	const base64Credentials = authHeader.replace("Basic ", "");
	// console.log(base64Credentials);

	// 3. Decode base64 credentials
	const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
		"utf-8",
	);
	// console.log(decodedCreds); // [username:password]

	const creds = decodedCreds.split(":");

	// Check if user exists
	const user = UserModel.get().find((user) => user.email == creds[0]);

	if (user && user.password === creds[1]) {
		next();
	} else {
		return res.status(401).json({
			success: false,
			message: "Invalid credentials",
			user: creds[0],
		});
	}
};

export default basicAuthorizer;
