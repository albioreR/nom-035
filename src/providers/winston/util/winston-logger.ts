import { createLogger, format, transports } from 'winston';

// Configuración de Winston
export const logger = createLogger({
  level: 'info', // Nivel mínimo de logs (puedes usar 'debug', 'info', 'warn', 'error')
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
    ),
  ),
  transports: [
    new transports.Console(), // Logs en consola
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs de errores
    new transports.File({ filename: 'logs/combined.log' }), // Todos los logs
  ],
});
