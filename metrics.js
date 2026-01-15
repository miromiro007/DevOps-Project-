const promClient = require('prom-client');

// Créer un registre pour toutes les métriques
const register = new promClient.Registry();

// Ajouter les métriques par défaut (CPU, mémoire, etc.)
promClient.collectDefaultMetrics({ register });

// Compteur de requêtes HTTP
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Histogramme pour la durée des requêtes
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register]
});

// Compteur d'erreurs
const errorCounter = new promClient.Counter({
  name: 'app_errors_total',
  help: 'Total number of application errors',
  labelNames: ['type'],
  registers: [register]
});

// Gauge pour le nombre de livres en stock
const booksInStockGauge = new promClient.Gauge({
  name: 'books_in_stock_total',
  help: 'Total number of books in stock',
  registers: [register]
});

module.exports = {
  register,
  httpRequestCounter,
  httpRequestDuration,
  errorCounter,
  booksInStockGauge
};
