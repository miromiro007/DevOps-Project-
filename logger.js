const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'crudbooks-api' },
  transports: [
    // Console pour développement et production
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// En production, logs en JSON pur
if (process.env.NODE_ENV === 'production') {
  logger.transports[0].format = winston.format.json();
}

module.exports = logger;
