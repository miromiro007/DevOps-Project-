const express = require("express")
const rateLimit = require('express-rate-limit');
const responseTime = require('response-time');
const logger = require('./logger');
const { register, httpRequestCounter, httpRequestDuration } = require('./metrics');

const app = express();
app.use(express.json());

// Rate limiting middleware - 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

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

app.get("/health", (req,res)=>res.json({status:"ok"}));

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
