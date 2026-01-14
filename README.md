# 📚 CrudBOOKS Backend API

A RESTful API for managing a books inventory system with CRUD operations, filtering, pagination, and sales tracking.

## 📋 Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete books
- ✅ **Advanced Filtering**: Filter by author, title, and price range
- ✅ **Pagination**: Built-in pagination support
- ✅ **Stock Management**: Track book quantities and sales
- ✅ **Input Validation**: Comprehensive request validation
- ✅ **RESTful API**: Standard HTTP methods and status codes
- ✅ **Health Check**: Built-in health endpoint for monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/crudbooks-backend.git
cd crudbooks-backend

# Install dependencies
npm install
```

### Local Development

```bash
# Start development server with hot reload
npm run dev

# The API will be available at http://localhost:3000
```

### Running Tests

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📡 API Endpoints

### Get All Books
```
GET /api/books
```

**Query Parameters:**
- `page` (default: 1) - Page number for pagination
- `limit` (default: 5, max: 100) - Items per page
- `author` - Filter by author name
- `title` - Filter by title (partial match)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

**Example:**
```bash
curl "http://localhost:3000/api/books?page=1&limit=5&minPrice=40&maxPrice=60"
```

**Response:**
```json
{
  "total": 3,
  "page": 1,
  "limit": 5,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": 45,
      "quantity": 12
    }
  ]
}
```

### Get Book by ID
```
GET /api/books/:id
```

**Example:**
```bash
curl http://localhost:3000/api/books/1
```

### Add New Book
```
POST /api/books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "price": 29.99,
  "quantity": 10
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Microservices Patterns",
    "author": "Chris Richardson",
    "price": 52.99,
    "quantity": 8
  }'
```

### Update Book
```
PUT /api/books/:id
Content-Type: application/json

{
  "title": "New Title",
  "author": "New Author",
  "price": 39.99,
  "quantity": 5
}
```

### Sell Book (Decrease Quantity)
```
POST /api/books/sell/:id
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/books/sell/1
```

### Delete Book
```
DELETE /api/books/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

## 🐳 Docker Usage

### Build Docker Image
```bash
docker build -t crudbooks-backend:latest .
```

### Run Container
```bash
docker run -p 3000:3000 crudbooks-backend:latest
```

### Using Docker Compose
```bash
docker-compose up
```

## 🔧 Development

### Project Structure
```
.
├── index.js                    # Application entry point
├── package.json               # Project dependencies
├── controllers/
│   └── booksControllers.js    # Business logic for book operations
├── routes/
│   └── booksRouter.js         # Route definitions
├── data/
│   └── data.js                # Sample data / database
└── Dockerfile                 # Docker configuration
```

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests with coverage report

## 📊 Observability

This API includes:

### Metrics
- Request counter per endpoint
- Response time tracking
- Error rate monitoring

### Logging
- Structured request logs
- Error logging with stack traces
- Request correlation IDs

### Health Endpoint
- GET `/health` - Returns service status

## 🔒 Security

### Implemented
- Input validation on all endpoints
- Request body size limits
- Error message sanitization
- Health check endpoint

### To Implement
- Rate limiting
- CORS configuration
- JWT authentication
- HTTPS in production
- Security headers (HSTS, CSP, etc.)

## 📈 Testing

The project includes comprehensive unit and integration tests:

```bash
npm test
```

**Test Coverage:**
- All CRUD operations
- Input validation
- Error handling
- Filtering and pagination
- Edge cases

## 🚀 Deployment

### Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Environment Variables
```
PORT=3000              # Server port
NODE_ENV=production    # Environment
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

ISC License

## 📧 Support

For issues and questions, please open a GitHub issue.

---

**Happy coding! 🚀**
