@echo off
REM Test API Project

echo.
echo ========================================
echo TEST COMPLET DU PROJET
echo ========================================

echo.
echo 1. HEALTH CHECK:
echo ---
curl http://localhost:3000/health

echo.
echo.
echo 2. TOUS LES LIVRES:
echo ---
curl http://localhost:3000/api/books

echo.
echo.
echo 3. METRICS (Observability):
echo ---
curl http://localhost:3000/metrics

echo.
echo.
echo 4. STATUS DU CONTAINER:
echo ---
docker ps --filter "name=crudbooks-api"

echo.
echo ========================================
echo TEST TERMINE
echo ========================================
