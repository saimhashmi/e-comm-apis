// Import modules
import express from "express";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";

import logger from "./src/middlewares/logger.middleware.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiNotFound from "./src/middlewares/404.middleware.js";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";

import apiDocs from "./swagger.json" assert { type: "json" };

// Create express server
const server = express();
const port = 3000;

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
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

// For all requests related to users, redirect to cart.routes.js
server.use("/api/cartItems", jwtAuth, cartRouter);

// Default request handler
server.get("/", (req, res) => {
	res.send("Hello, this is my e-comm app");
});

// Middlware to handle 404 requests
server.use(apiNotFound);

server.listen(port, () => {
	console.log(
		`Server is listening at port ${port}, navigate to http://localhost:3000/`,
	);
});
