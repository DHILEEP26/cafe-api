# Restaurant Menu Management System API

A robust REST API built with Node.js, Express, TypeScript, and PostgreSQL for managing restaurant menu categories and items with role-based authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Scalability Considerations](#scalability-considerations)

## ✨ Features

- **Menu Category Management**: Create, read, update, and delete menu categories
- **Menu Item Management**: Full CRUD operations for menu items
- **Category-based filtering**: Fetch menu items by category
- **Availability Toggle**: Easy management of item availability
- **Role-based Authentication**: Admin-only routes for data modification
- **Input Validation**: Comprehensive DTO validation for all endpoints
- **Proper Error Handling**: Consistent error responses with appropriate HTTP status codes
- **Database Relations**: Properly structured with foreign key constraints
- **Pagination Support**: Efficient data retrieval with pagination
- **Search Functionality**: Search menu items by name or description

## 🛠 Tech Stack

### Core Technologies
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma

### Additional Libraries
- **Authentication**: jsonwebtoken, bcryptjs
- **Security**: helmet, cors, express-rate-limit, hpp
- **Logging**: morgan
- **Validation**: Custom DTO validators


## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (or Neon account)
- npm or yarn

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd restaurant-menu-api
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://user:password@host:5432/restaurant_db?schema=public"
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production"
PORT=3000
NODE_ENV=development
```

### Step 4: Generate Prisma Client

```bash
npm run prisma:generate
```

### Step 5: Run database migrations

```bash
npm run prisma:migrate
```

### Step 6: Start the server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Endpoints

#### Register Admin
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@restaurant.com",
  "password": "securePassword123",
  "role": "ADMIN"  // Optional: ADMIN or SUPER_ADMIN
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "email": "admin@restaurant.com",
    "role": "ADMIN",
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@restaurant.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "user": {
      "id": 1,
      "email": "admin@restaurant.com",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Menu Category Endpoints

#### Get All Categories
```http
GET /api/categories?includeInactive=false
```

**Response (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "Appetizers",
      "display_order": 1,
      "is_active": true,
      "created_at": "2024-01-30T10:00:00.000Z",
      "updated_at": "2024-01-30T10:00:00.000Z",
      "_count": {
        "menuItems": 5
      }
    }
  ]
}
```

#### Get Category by ID
```http
GET /api/categories/:id
```

#### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Desserts",
  "display_order": 5,
  "is_active": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "statusCode": 201,
  "data": {
    "id": 5,
    "name": "Desserts",
    "display_order": 5,
    "is_active": true,
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z"
  }
}
```

#### Update Category (Admin Only)
```http
PUT /api/categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Sweet Treats",
  "display_order": 6
}
```

#### Delete Category (Admin Only)
```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

#### Toggle Category Status (Admin Only)
```http
PATCH /api/categories/:id/toggle-status
Authorization: Bearer <token>
```

### Menu Item Endpoints

#### Get All Menu Items
```http
GET /api/menu-items?page=1&limit=10&categoryId=1&searchTerm=pasta
```

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page
- `categoryId` (optional): Filter by category
- `searchTerm` (optional): Search in name/description
- `includeUnavailable` (optional): Include unavailable items

**Response (200):**
```json
{
  "success": true,
  "message": "Menu items retrieved successfully",
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "name": "Caesar Salad",
      "description": "Fresh romaine with parmesan",
      "price": "12.99",
      "is_available": true,
      "created_at": "2024-01-30T10:00:00.000Z",
      "updated_at": "2024-01-30T10:00:00.000Z",
      "category": {
        "id": 1,
        "name": "Appetizers",
        "is_active": true
      }
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### Get Menu Item by ID
```http
GET /api/menu-items/:id
```

#### Get Menu Items by Category
```http
GET /api/menu-items/category/:categoryId
```

#### Create Menu Item (Admin Only)
```http
POST /api/menu-items
Authorization: Bearer <token>
Content-Type: application/json

{
  "category_id": 1,
  "name": "Greek Salad",
  "description": "Fresh vegetables with feta cheese",
  "price": 14.99,
  "is_available": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Menu item created successfully",
  "statusCode": 201,
  "data": {
    "id": 10,
    "category_id": 1,
    "name": "Greek Salad",
    "description": "Fresh vegetables with feta cheese",
    "price": "14.99",
    "is_available": true,
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z",
    "category": {
      "id": 1,
      "name": "Appetizers",
      "display_order": 1,
      "is_active": true
    }
  }
}
```

#### Update Menu Item (Admin Only)
```http
PUT /api/menu-items/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 15.99,
  "description": "Updated description"
}
```

#### Delete Menu Item (Admin Only)
```http
DELETE /api/menu-items/:id
Authorization: Bearer <token>
```

#### Toggle Menu Item Availability (Admin Only)
```http
PATCH /api/menu-items/:id/toggle-availability
Authorization: Bearer <token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How it works:

1. **Register/Login**: Obtain a JWT token
2. **Include Token**: Add to Authorization header: `Bearer <token>`
3. **Token Expiration**: Tokens expire after 24 hours
4. **Admin Guards**: Protected routes verify both authentication and admin role

### Protected Routes:

All POST, PUT, PATCH, and DELETE operations require admin authentication.

## ✅ Validation

### DTO Validation

All input data is validated using custom DTO validators before processing:

#### Menu Category Validation
- `name`: Required, non-empty string, max 100 characters
- `display_order`: Optional, non-negative number
- `is_active`: Optional, boolean

#### Menu Item Validation
- `category_id`: Required, valid number
- `name`: Required, non-empty string, max 200 characters
- `description`: Optional, string
- `price`: Required, positive number, max 99999999.99
- `is_available`: Optional, boolean

#### Authentication Validation
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `role`: Optional, must be ADMIN or SUPER_ADMIN

### Example Validation Error Response:

```json
{
  "success": false,
  "message": "Name is required and must be a non-empty string, Price must be a positive number",
  "statusCode": 400
}
```

## 🚨 Error Handling

### HTTP Status Codes

The API uses appropriate HTTP status codes:

- `200 OK`: Successful GET/PUT/PATCH/DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Validation errors or invalid data
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate entry (e.g., email/category name)
- `500 Internal Server Error`: Server errors

### Error Response Format

```json
{
  "success": false,
  "message": "Descriptive error message",
  "statusCode": 400
}
```

### Prisma Error Handling

- `P2002`: Unique constraint violation → 409 Conflict
- `P2025`: Record not found → 404 Not Found
- `P2003`: Foreign key constraint failed → 400 Bad Request

## 📈 Scalability Considerations

### Current Implementation

1. **Indexing Strategy**:
   - Indexes on frequently queried columns
   - Composite indexes for complex queries
   - Unique indexes for data integrity

2. **Pagination**:
   - Prevents loading large datasets
   - Configurable page size
   - Efficient offset-based pagination

3. **Connection Pooling**:
   - Prisma manages connection pool automatically
   - Optimized for concurrent requests

### Future Enhancements

1. **Caching Layer**:
   - Redis for frequently accessed data
   - Cache-aside pattern for categories
   - TTL-based invalidation

2. **Database Optimization**:
   - Read replicas for read-heavy operations
   - Partitioning for large tables
   - Query optimization and monitoring

3. **API Improvements**:
   - GraphQL for flexible queries
   - Cursor-based pagination
   - Field selection to reduce payload

4. **Monitoring**:
   - Query performance tracking
   - Slow query logging
   - Database metrics dashboard

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test

# View Prisma Studio
npm run prisma:studio
```

## 📝 License

MIT

## 👨‍💻 Author

Your Name - [GitHub Profile]

---

**Note**: This is a demonstration project following clean architecture principles with proper separation of concerns, validation, error handling, and database design.
