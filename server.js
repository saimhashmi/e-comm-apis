// Import modules
import express from "express";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";
import cors from "cors";

import {
	closeMongoDBConnection,
	connectToMongoDB,
} from "./src/config/mongodb.js";

import logger, { writeLog } from "./src/middlewares/logger.middleware.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import invalidRoutesHandler from "./src/middlewares/invalidRoutesHandler.middleware.js";
// import allowCORS from "./src/middlewares/cors.middleware.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";

import apiDocs from "./swagger.json" assert { type: "json" };

// Create express server
const server = express();
const port = 3000;

// CORS policy configuration
// server.use(allowCORS);
const corsOptions = {
	origin: "http://127.0.0.1:5500", // By default it will allow all origins
	allowedHeaders: ["Content-Type", "authorization"],
};
server.use(cors(corsOptions));

// Add middleware for logging to all requests
server.use(logger);

// Setting up swagger ui api docs
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
// To parse POST request data as JSON
// Alternatively we can use body-parser npm package but since express now natively supports it, theres no need to add another package
// import bodyParser from 'body-parser';
// server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

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
// Needs to be put in the end or other handler(s) will not work
server.use(invalidRoutesHandler);

// Error handler middleware
server.use(errorHandler);

server.listen(port, async () => {
	console.log(`Server is live at http://localhost:${port}/`);
	// Connect to DB
	await connectToMongoDB();
});

// Graceful shutdown: close Mongo connection on Ctrl+C
process.on("SIGINT", async () => {
	await closeMongoDBConnection();
	process.exit(0);
});
