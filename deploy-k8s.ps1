# Kubernetes Deployment Script for CRUD Books API

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Building Docker Image..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

docker build -t crudbooks-backend:1.0 .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Docker image built successfully!" -ForegroundColor Green

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Listing Docker images..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

docker images | findstr crudbooks

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Deleting old Kubernetes deployment..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

kubectl delete deployment crudbooks-api --ignore-not-found=true

Start-Sleep -Seconds 3

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Applying new Kubernetes manifests..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Waiting for pods to start (20 seconds)..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

Start-Sleep -Seconds 20

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Pod Status:" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

kubectl get pods

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Service Status:" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

kubectl get svc crudbooks-service

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Testing API..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

Start-Sleep -Seconds 5

try {
    $response = Invoke-WebRequest -Uri "http://localhost:30080/health" -UseBasicParsing
    Write-Host "✅ Health Check: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "❌ Health Check failed: $_" -ForegroundColor Red
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "API Available at: http://localhost:30080" -ForegroundColor Cyan
Write-Host "Health endpoint: http://localhost:30080/health" -ForegroundColor Cyan
Write-Host "Books endpoint: http://localhost:30080/api/books" -ForegroundColor Cyan
