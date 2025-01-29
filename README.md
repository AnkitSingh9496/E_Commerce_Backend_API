# E-Commerce API Documentation

# ScreenShots of API Testing
### 1. GET
![Screenshot 2025-01-30 003025](https://github.com/user-attachments/assets/ebc64cb4-8a40-49a2-8adc-22c86affb745)

### 2. GET by ID
![Screenshot (796)](https://github.com/user-attachments/assets/f20fde19-8781-4027-81f6-0b67523e65af)

### 3. PUT
![Screenshot 2025-01-30 002807](https://github.com/user-attachments/assets/a65b4409-74d7-4a26-922d-a03139ac8c44)

### 4. POST
![Screenshot 2025-01-30 002950](https://github.com/user-attachments/assets/85886c40-403b-4c5e-9e1a-65d9daf7b90f)

### 5. DELETE
![Screenshot (797)](https://github.com/user-attachments/assets/97831374-1dcd-4ce9-9fae-42d33be4278b)


## Base URL
```
http://localhost:3000
```

## Authentication
Currently, the API doesn't require authentication.

## Endpoints

### 1. Get All Products
Fetch all products with pagination and filters.

**Request:**
```http
GET /products?page=1&limit=10&tag=electronics&minPrice=100&maxPrice=1000&search=phone
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `tag` (optional): Filter by product tag
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `search` (optional): Search in product name

**Response:** (200 OK)
```json
{
    "data": [
        {
            "id": 1,
            "name": "iPhone 13",
            "price": 999.99,
            "description": "Latest Apple smartphone",
            "image_url": "https://example.com/iphone13.jpg",
            "tag": "electronics",
            "category": {
                "id": 1,
                "name": "Electronics"
            },
            "created_at": "2024-01-30T10:00:00Z",
            "updated_at": "2024-01-30T10:00:00Z"
        }
    ],
    "metadata": {
        "currentPage": 1,
        "totalPages": 5,
        "totalProducts": 50,
        "limit": 10
    }
}
```

### 2. Get Single Product
Fetch a single product by ID.

**Request:**
```http
GET /products/{id}
```

**Response:** (200 OK)
```json
{
    "id": 1,
    "name": "iPhone 13",
    "price": 999.99,
    "description": "Latest Apple smartphone",
    "image_url": "https://example.com/iphone13.jpg",
    "tag": "electronics",
    "category": {
        "id": 1,
        "name": "Electronics"
    },
    "created_at": "2024-01-30T10:00:00Z",
    "updated_at": "2024-01-30T10:00:00Z"
}
```

### 3. Create Product
Create a new product.

**Request:**
```http
POST /products
Content-Type: application/json

{
    "name": "Gaming Laptop",
    "price": 1299.99,
    "description": "High-performance gaming laptop",
    "category_id": 1,
    "image_url": "https://example.com/gaming-laptop.jpg",
    "tag": "electronics"
}
```

**Response:** (201 Created)
```json
{
    "id": 2,
    "name": "Gaming Laptop",
    "price": 1299.99,
    "description": "High-performance gaming laptop",
    "image_url": "https://example.com/gaming-laptop.jpg",
    "tag": "electronics",
    "category": {
        "id": 1,
        "name": "Electronics"
    },
    "created_at": "2024-01-30T11:00:00Z",
    "updated_at": "2024-01-30T11:00:00Z"
}
```

### 4. Update Product
Update an existing product.

**Request:**
```http
PUT /products/{id}
Content-Type: application/json

{
    "price": 1199.99,
    "description": "Updated description for the gaming laptop"
}
```

**Response:** (200 OK)
```json
{
    "id": 2,
    "name": "Gaming Laptop",
    "price": 1199.99,
    "description": "Updated description for the gaming laptop",
    "image_url": "https://example.com/gaming-laptop.jpg",
    "tag": "electronics",
    "category": {
        "id": 1,
        "name": "Electronics"
    },
    "created_at": "2024-01-30T11:00:00Z",
    "updated_at": "2024-01-30T11:30:00Z"
}
```

### 5. Delete Product
Delete a product by ID.

**Request:**
```http
DELETE /products/{id}
```

**Response:** (204 No Content)
```
No content in response
```

## Error Responses

### 400 Bad Request
```json
{
    "message": "Validation failed",
    "errors": [
        "price must be a positive number",
        "name is required"
    ]
}
```

### 404 Not Found
```json
{
    "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
    "message": "Internal server error"
}
```
