// Import modules
import express from "express";
import logger from "./src/middlewares/logger.middleware.js";
import productRouter from "./src/features/product/product.routes.js";

// Create express server
const server = express();
const port = 3000;

// To parse POST request data as JSON
// Alternatively we can use body-parser npm package but since express now natively supports it, theres no need to add another package
// import bodyParser from 'body-parser';
// server.use(bodyParser.json());
server.use(express.json());

// Add middleware for logging to all requests
server.use(logger);

// For all requests related to products, redirect to product.routes.js
server.use("/api/products", productRouter);

// Default request handler
server.get("/", (req, res) => {
	// res.send({ message: "Hello, this is my e-comm app" });
	res.json({ message: "Hello, this is my e-comm app" });
	// res.send("Hello, this is my e-comm app");
});

server.listen(port, () => {
	console.log(
		`Server is listening at port ${port}, navigate to http://localhost:3000/`,
	);
});
