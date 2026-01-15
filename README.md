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

# CRUD Books Backend - DevOps Project

[![CI](https://github.com/miromiro007/DevOps-Project-/actions/workflows/ci.yml/badge.svg)](https://github.com/miromiro007/DevOps-Project-/actions/workflows/ci.yml)
[![CodeQL](https://github.com/miromiro007/DevOps-Project-/actions/workflows/codeql.yml/badge.svg)](https://github.com/miromiro007/DevOps-Project-/actions/workflows/codeql.yml)
[![DAST](https://github.com/miromiro007/DevOps-Project-/actions/workflows/dast.yml/badge.svg)](https://github.com/miromiro007/DevOps-Project-/actions/workflows/dast.yml)

A production-ready REST API for managing books, demonstrating complete DevOps practices including CI/CD, containerization, orchestration, observability, and security scanning.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [DevOps Features](#devops-features)
- [Security](#security)
- [Observability](#observability)
- [Kubernetes Deployment](#kubernetes-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)

---

## ✨ Features

- ✅ **CRUD Operations** for books management
- ✅ **RESTful API** with Express.js
- ✅ **Pagination** support for listing books
- ✅ **Sell functionality** with stock management
- ✅ **Health check** endpoint for monitoring
- ✅ **Metrics endpoint** for Prometheus
- ✅ **Structured logging** with Winston
- ✅ **Under 150 lines of code** (main business logic)

---

## 🛠 Technology Stack

### Backend
- **Node.js** 20
- **Express.js** 5.2.1
- **JavaScript** (CommonJS)

### DevOps Tools
- **Docker** & Docker Compose
- **Kubernetes** (minikube/kind compatible)
- **GitHub Actions** (CI/CD)
- **OWASP ZAP** (DAST)
- **CodeQL** (SAST)

### Observability
- **Winston** (Structured logging)
- **prom-client** (Prometheus metrics)
- **response-time** (Performance tracking)

### Testing
- **Jest** (Unit tests)
- **Supertest** (API tests)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/miromiro007/DevOps-Project-.git
cd "DevOps-Project-"
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
# Server starts on http://localhost:3000
```

4. **Run with Docker Compose**
```bash
docker compose up --build -d
```

5. **Test the API**
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/books
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
```http
GET /health
```
Response:
```json
{
  "status": "ok"
}
```

#### List All Books (with pagination)
```http
GET /api/books?page=1&limit=5
```
Response:
```json
{
  "total": 10,
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

#### Get Book by ID
```http
GET /api/books/:id
```

#### Add a New Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "DevOps Handbook",
  "author": "Gene Kim",
  "price": 50,
  "quantity": 20
}
```

#### Update a Book
```http
PUT /api/books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 55
}
```

#### Sell a Book
```http
POST /api/books/sell/:id
Content-Type: application/json

{
  "quantitySold": 2
}
```

#### Delete a Book
```http
DELETE /api/books/:id
```

---

## 🔧 DevOps Features

### 1. **Containerization**
- Multi-stage Dockerfile with Node.js Alpine
- Docker Compose for local development
- Optimized image size (<100MB)
- `.dockerignore` for clean builds

### 2. **CI/CD Pipeline**
- Automated testing on every push
- Docker image building
- Security scanning (SAST + DAST)
- Deployment ready

### 3. **Kubernetes Ready**
- Deployment manifests with 2 replicas
- Service with NodePort (30080)
- ConfigMap for environment variables
- Liveness & Readiness probes
- Resource limits (CPU/Memory)

### 4. **Infrastructure as Code**
- All configurations in Git
- Reproducible environments
- Version controlled

---

## 🔒 Security

### Static Application Security Testing (SAST)
- **CodeQL** analysis on every push
- Detects security vulnerabilities in code
- Automated security alerts

### Dynamic Application Security Testing (DAST)
- **OWASP ZAP** baseline scan
- Tests running application for vulnerabilities
- Checks for:
  - SQL Injection
  - XSS (Cross-Site Scripting)
  - Security headers
  - CORS misconfigurations

### Best Practices
- No sensitive data in code
- Dependencies security scanning
- Environment variables for configuration
- `.gitignore` for secrets

---

## 📊 Observability

### Structured Logging
- JSON format logs with Winston
- Request/response logging
- Error tracking with stack traces
- Log levels: info, warn, error

### Metrics (Prometheus Format)
Access metrics at: `http://localhost:3000/metrics`

**Available Metrics:**
- `http_requests_total` - Total HTTP requests by method/route/status
- `http_request_duration_seconds` - Request duration histogram
- `app_errors_total` - Application errors counter
- `books_in_stock_total` - Current books inventory
- `process_cpu_seconds_total` - CPU usage
- `process_resident_memory_bytes` - Memory usage

### Performance Tracking
- Response time measurement for all endpoints
- Request tracing with timestamps
- Resource utilization monitoring

---

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

1. **Start your cluster** (Docker Desktop/Minikube/Kind)

2. **Apply manifests**
```bash
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

3. **Verify deployment**
```bash
kubectl get all
kubectl get pods
```

4. **Access the application**
```bash
# Docker Desktop
http://localhost:30080

# Minikube
minikube service crudbooks-service --url

# Kind (port-forward)
kubectl port-forward service/crudbooks-service 3000:3000
```

### Kubernetes Features
- **High Availability**: 2 replicas with load balancing
- **Health Checks**: Liveness and readiness probes
- **Auto-restart**: Automatic pod recovery on failure
- **Resource Management**: CPU/Memory limits and requests
- **Configuration**: Externalized via ConfigMap

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. **CI (Continuous Integration)**
**Trigger:** Push/PR to main branch

**Steps:**
- ✅ Checkout code
- ✅ Setup Node.js 20
- ✅ Install dependencies (npm install)
- ✅ Run tests (npm test)
- ✅ Build Docker image

#### 2. **CodeQL (SAST)**
**Trigger:** Push/PR + Weekly schedule (Monday 3 AM)

**Steps:**
- ✅ Initialize CodeQL
- ✅ Autobuild application
- ✅ Perform security analysis
- ✅ Upload results to Security tab

#### 3. **DAST (Dynamic Security)**
**Trigger:** Push/PR + Manual dispatch

**Steps:**
- ✅ Build Docker image
- ✅ Start application container
- ✅ Run OWASP ZAP baseline scan
- ✅ Generate security report
- ✅ Upload artifacts

### View Results
- **Actions Tab**: https://github.com/miromiro007/DevOps-Project-/actions
- **Security Tab**: https://github.com/miromiro007/DevOps-Project-/security

---

## 📁 Project Structure

```
CrudBOOKS BACKEND/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI/CD pipeline
│       ├── codeql.yml          # SAST security scan
│       └── dast.yml            # DAST security scan
├── .zap/
│   └── rules.tsv               # OWASP ZAP rules
├── __tests__/
│   └── health.test.js          # API tests
├── controllers/
│   └── booksControllers.js     # Business logic
├── data/
│   └── data.js                 # Mock database
├── k8s/
│   ├── configmap.yml           # Kubernetes config
│   ├── deployment.yml          # Kubernetes deployment
│   ├── service.yml             # Kubernetes service
│   └── README.md               # K8s deployment guide
├── routes/
│   └── booksRouter.js          # API routes
├── .dockerignore               # Docker ignore rules
├── .gitignore                  # Git ignore rules
├── docker-compose.yml          # Docker Compose config
├── Dockerfile                  # Container definition
├── index.js                    # Application entry point
├── logger.js                   # Logging configuration
├── metrics.js                  # Prometheus metrics
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🧪 Testing

### Run Tests Locally
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

### Manual API Testing
```bash
# Health check
curl http://localhost:3000/health

# Get all books
curl http://localhost:3000/api/books

# Add a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Author","price":30,"quantity":5}'

# View metrics
curl http://localhost:3000/metrics
```

---

## 📈 Monitoring

### Health Endpoint
- **URL**: `GET /health`
- **Purpose**: Kubernetes liveness/readiness probes
- **Response**: `{"status":"ok"}`

### Metrics Endpoint
- **URL**: `GET /metrics`
- **Format**: Prometheus format
- **Usage**: Scrape with Prometheus/Grafana

### Logs
- **Format**: JSON structured logs
- **Output**: stdout (Docker logs)
- **View logs**:
  ```bash
  docker compose logs -f
  # or
  kubectl logs -f <pod-name>
  ```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│                    GitHub                        │
│  (Code Repository + CI/CD + Security Scanning)  │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Git Push
                  ▼
┌─────────────────────────────────────────────────┐
│              GitHub Actions                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │    CI    │  │  CodeQL  │  │   DAST   │      │
│  │  Build   │  │   SAST   │  │ OWASP ZAP│      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Docker Build
                  ▼
┌─────────────────────────────────────────────────┐
│              Docker Image                        │
│         crudbooks-backend:1.0                   │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
┌──────────────┐    ┌──────────────────┐
│    Docker    │    │   Kubernetes     │
│   Compose    │    │  (minikube/kind) │
│              │    │                  │
│  Port: 3000  │    │  NodePort: 30080 │
└──────────────┘    └──────────────────┘
        │                    │
        └─────────┬──────────┘
                  │
                  ▼
        ┌──────────────────┐
        │   Node.js API    │
        │   + Express      │
        │   + Observability│
        └──────────────────┘
```

---

## 🎯 DevOps Implementation

| Requirement | Implementation | Status |
|------------|----------------|--------|
| Backend Service | Node.js + Express API | ✅ |
| Version Control | Git + GitHub | ✅ |
| Pull Requests | Feature branches + Reviews | ✅ |
| CI/CD Pipeline | GitHub Actions | ✅ |
| Observability - Metrics | Prometheus + /metrics | ✅ |
| Observability - Logs | Winston JSON logs | ✅ |
| Observability - Tracing | Request tracking | ✅ |
| Security - SAST | CodeQL analysis | ✅ |
| Security - DAST | OWASP ZAP scan | ✅ |
| Containerization | Docker + Dockerfile | ✅ |
| Docker Compose | Multi-container setup | ✅ |
| Kubernetes | Deployment + Service | ✅ |
| Documentation | Complete README | ✅ |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

ISC License

---

## 👤 Author

**miromiro007**

- GitHub: [@miromiro007](https://github.com/miromiro007)
- Repository: [DevOps-Project-](https://github.com/miromiro007/DevOps-Project-)

---

## 🙏 Acknowledgments

- Express.js team
- Docker & Kubernetes community
- OWASP ZAP project
- GitHub Actions team
- Winston & Prometheus communities

---

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Prometheus Metrics](https://prometheus.io/docs/introduction/overview/)

---

**Built with ❤️ for DevOps learning**
