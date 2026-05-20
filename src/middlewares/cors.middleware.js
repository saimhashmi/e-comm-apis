const allowCORS = (req, res, next) => {
	// give access to specific client, needs to be without slash at the end
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
	res.header(
		"Access-Control-Allow-Methods",
		"POST, GET, OPTIONS, PUT, DELETE",
	);
	// give access to everyone
	// res.header("Access-Control-Allow-Origin", "*");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200); // Respond to preflight and stop here
	}

	next();
};

export default allowCORS;
