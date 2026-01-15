const express = require("express")
const responseTime = require('response-time');
const logger = require('./logger');
const { register, httpRequestCounter, httpRequestDuration } = require('./metrics');

const app = express();
app.use(express.json());

// Middleware pour logger toutes les requêtes
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip
  });
  next();
});

// Middleware pour mesurer le temps de réponse
app.use(responseTime((req, res, time) => {
  const route = req.route ? req.route.path : req.url;
  const statusCode = res.statusCode;
  
  // Incrémenter le compteur de requêtes
  httpRequestCounter.inc({
    method: req.method,
    route: route,
    status_code: statusCode
  });
  
  // Enregistrer la durée
  httpRequestDuration.observe({
    method: req.method,
    route: route,
    status_code: statusCode
  }, time / 1000);
  
  logger.info('Request completed', {
    method: req.method,
    url: req.url,
    statusCode: statusCode,
    responseTime: `${time.toFixed(2)}ms`
  });
}));


const bookRoutes = require("./routes/booksRouter");
app.use("/api",bookRoutes);


//route simple 
app.get('/', (req, res) => {
  res.send('Hello Express 🚀');
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: require('./package.json').version,
    environment: process.env.NODE_ENV || 'development',
    memory: {
      used: Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
      total: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
    }
  });
});

// Endpoint pour exposer les métriques Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const Port = process.env.PORT || 3000 ; 

if (require.main === module) {
  app.listen(Port,()=>{
      logger.info(`Serveur lancé sur http://localhost:${Port}`);
      logger.info(`Métriques disponibles sur http://localhost:${Port}/metrics`);
  });
}

module.exports = app;
