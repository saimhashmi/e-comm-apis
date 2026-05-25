# E-Commerce Backend Application

A comprehensive Node.js/Express backend for an e-commerce web application with JWT authentication, error handling, and comprehensive API documentation using Swagger.

## 📚 Learning Project Overview

This project demonstrates core backend development concepts including:

- **RESTful API Design** - Creating scalable API endpoints
- **JWT Authentication** - Secure token-based authentication
- **Application-Level Error Handling** - Centralized error management with logging
- **Request Logging** - Winston logger for request and error tracking
- **Database Operations** - In-memory data models (can be extended to use real databases)
- **File Uploads** - Handling product image uploads
- **CORS & Security** - Cross-origin configuration and security middleware

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Logging:** Winston
- **API Documentation:** Swagger/OpenAPI 3.0
- **File Handling:** Multer
- **Middleware:** Cookie Parser, CORS

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Steps

1. **Clone/Navigate to project:**

    ```bash
    cd e-comm
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:

    ```
    JWT_SECRET=your_secret_key_here
    ```

4. **Start the server:**

    ```bash
    npm start
    # or
    node server.js
    ```

    Server will run on: `http://localhost:3000/`

5. **Access API Documentation:**
   Open browser and visit: `http://localhost:3000/api-docs`

---

## 📋 Project Structure

```
e-comm/
├── src/
│   ├── features/
│   │   ├── user/              # User authentication
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   └── user.routes.js
│   │   ├── product/           # Product management
│   │   │   ├── product.controller.js
│   │   │   ├── product.model.js
│   │   │   └── product.routes.js
│   │   └── cart/              # Shopping cart
│   │       ├── cartItem.controller.js
│   │       ├── cartItem.model.js
│   │       └── cartItem.routes.js
│   ├── middlewares/           # Custom middlewares
│   │   ├── jwt.middleware.js       # JWT verification
│   │   ├── logger.middleware.js    # Request logging
│   │   ├── validation.middleware.js
│   │   ├── fileUpload.middleware.js
│   │   └── 404.middleware.js
│   ├── error-handler/
│   │   └── applicationError.js    # Custom error class
│   └── public/                # Frontend files
│       ├── html/
│       ├── css/
│       ├── js/
│       └── images/
├── logs/
│   └── server.log            # Application logs
├── uploads/                  # Product image uploads
├── server.js                 # Express server entry point
├── package.json
└── swagger.json              # API documentation
```

---

## 🔐 API Endpoints

### User Endpoints

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login (returns JWT token)

### Product Endpoints (Requires JWT)

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (with image upload)
- `GET /api/products/{id}` - Get single product
- `GET /api/products/filter?minPrice=X&maxPrice=Y&category=Z` - Filter products
- `POST /api/products/rate?productID=X&rating=Y` - Rate a product

### Cart Endpoints (Requires JWT)

- `GET /api/cartItems` - Get user's cart items
- `POST /api/cartItems?productID=X&quantity=Y` - Add item to cart
- `DELETE /api/cartItems/{id}` - Remove item from cart

---

## 🔑 Authentication

### How JWT Works in This Project

1. **User Registration/Login:**
    - User provides email and password
    - Server validates and returns JWT token

2. **Protected Routes:**
    - JWT token is required in cookie (name: `jwtToken`)
    - Middleware verifies token before allowing access
    - Invalid/expired tokens return 401 Unauthorized

3. **Token Storage:**
    - JWT is set as HTTP-only cookie after login
    - Token expires in 1 hour

---

## 📝 Error Handling & Logging

### Application-Level Error Handling

**Architecture:**

```
Controller throws ApplicationError
  → Express catches synchronously
    → Error handler middleware logs error
      → Winston logger writes to logs/server.log
        → Client receives error response
```

**Features:**

- ✅ Centralized error handler at application level
- ✅ All errors logged to `logs/server.log` (not console for production)
- ✅ Custom `ApplicationError` class for business logic errors
- ✅ Stack traces preserved for debugging
- ✅ Sensitive info masked in logs (passwords replaced with \*)

**Error Log Example:**

```json
{
	"level": "error",
	"message": "Invalid email or password",
	"method": "POST",
	"url": "/api/users/login",
	"stack": "Error: Invalid email or password\n    at userSignIn...",
	"service": "request-logging"
}
```

### Request Logging

All requests are logged with:

- HTTP method and route
- Request body (passwords masked)
- Response status code
- Duration in milliseconds

---

## 🧪 Testing Endpoints

### Using cURL

**Register User:**

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"pass123","name":"John","type":"buyer"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"pass123"}'
```

**Get Products (with JWT):**

```bash
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API from `http://localhost:3000/api-docs`
2. Set JWT token in Authorization header or cookies
3. Test endpoints

---

## 📱 Frontend

The frontend files are located in `src/public/`:

- **HTML:** `src/public/html/index.html` - Main page structure
- **CSS:** `src/public/css/styles.css` - Styling
- **JavaScript:** `src/public/js/script.js` - Client-side logic

### Frontend Features to Implement:

- User registration form
- User login form
- Product listing page
- Product filter/search functionality
- Product detail view
- Shopping cart display
- Add to cart functionality
- Cart checkout page

### Frontend Technologies (Suggested):

- Vanilla JavaScript or modern framework (React/Vue)
- Bootstrap/Tailwind for styling
- Fetch API or Axios for API calls

---

## ✅ Completed Features

- [x] User authentication with JWT
- [x] Product CRUD operations
- [x] Product filtering
- [x] Product rating
- [x] Shopping cart management
- [x] Application-level error handling
- [x] Request/error logging with Winston
- [x] CORS configuration
- [x] File upload for product images
- [x] Swagger API documentation
- [x] Input validation middleware

---

## 📋 To-Do List / Future Improvements

### High Priority

- [ ] **Connect to Real Database** - Replace in-memory models with MongoDB/PostgreSQL
- [ ] **Complete Frontend** - Build responsive UI for user interactions
- [ ] **Order Management** - Add checkout and order history features
- [ ] **Payment Integration** - Add payment gateway (Stripe/PayPal)
- [ ] **Admin Panel** - Admin dashboard for product/order management

### Medium Priority

- [ ] **User Profile** - User profile management and edit functionality
- [ ] **Product Reviews** - Add detailed review system (not just ratings)
- [ ] **Wishlist** - Allow users to save favorite products
- [ ] **Inventory Management** - Track stock levels
- [ ] **Email Notifications** - Order confirmation, shipment updates
- [ ] **Advanced Filtering** - Search by name, tags, seller

### Quality & Security

- [ ] **Input Sanitization** - Prevent SQL injection/XSS attacks
- [ ] **Rate Limiting** - Prevent API abuse
- [ ] **Unit Tests** - Add Jest/Mocha test suite
- [ ] **Integration Tests** - Test API endpoints comprehensively
- [ ] **API Versioning** - Plan for v2 API
- [ ] **Caching** - Implement Redis caching
- [ ] **Security Headers** - Helmet.js for security

### Performance

- [ ] **Database Indexing** - Optimize query performance
- [ ] **Pagination** - Add pagination for large product lists
- [ ] **Image Optimization** - Compress and resize product images
- [ ] **Lazy Loading** - Frontend lazy load images

### DevOps & Deployment

- [ ] **Docker Setup** - Containerize application
- [ ] **CI/CD Pipeline** - GitHub Actions workflow
- [ ] **Environment Management** - Separate dev/staging/production configs
- [ ] **API Rate Limiting** - Implement throttling
- [ ] **Load Testing** - Performance testing with k6/JMeter

---

## 🐛 Troubleshooting

### 500 Error on Login

- Check JWT_SECRET is set in .env
- Verify user exists with correct email/password
- Check error logs in `logs/server.log`

### File Upload Issues

- Ensure `uploads/` directory exists
- Check file size limits
- Verify MIME type validation

### CORS Errors

- Update `corsOptions.origin` in server.js to match your frontend URL
- Currently set to: `http://127.0.0.1:5500`

### JWT Verification Fails

- Ensure token is in cookie named `jwtToken`
- Check token hasn't expired (1 hour)
- Verify JWT_SECRET matches during signing

---

## 📚 Key Learning Outcomes

By working through this project, you'll learn:

1. **Backend Architecture** - How to structure Express applications
2. **Authentication** - Implementing JWT-based auth systems
3. **Error Handling** - Centralized error management patterns
4. **Logging** - Production-grade logging with Winston
5. **Middleware** - Writing custom middleware functions
6. **RESTful Design** - Creating clean API endpoints
7. **Data Validation** - Input validation and sanitization
8. **API Documentation** - Swagger/OpenAPI documentation
9. **Security** - CORS, JWT, password handling

---

## 📄 License

This is a learning project for educational purposes.

---

## 👨‍💻 Author

Created as part of Coding Ninjas Node.js learning course.
