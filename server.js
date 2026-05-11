// Import modules
import express from "express";
import cookieParser from "cookie-parser";
import logger from "./src/middlewares/logger.middleware.js";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

// Create express server
const server = express();
const port = 3000;

// To parse POST request data as JSON
// Alternatively we can use body-parser npm package but since express now natively supports it, theres no need to add another package
// import bodyParser from 'body-parser';
// server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

// Add middleware for logging to all requests
server.use(logger);

// For all requests related to products, redirect to product.routes.js
// server.use("/api/products", basicAuthorizer, productRouter);
server.use("/api/products", jwtAuth, productRouter);

// For all requests related to users, redirect to user.routes.js
server.use("/api/users", userRouter);

// Default request handler
server.get("/", (req, res) => {
	res.send("Hello, this is my e-comm app");
});

server.listen(port, () => {
	console.log(
		`Server is listening at port ${port}, navigate to http://localhost:3000/`,
	);
});
