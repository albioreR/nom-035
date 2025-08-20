import morgan from 'morgan';

import { logger } from '../util';

export const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms- :user-agent',
  {
    stream: {
      write: (message: string) => logger.info(message.trim()), // Redirigir los logs de Morgan a Winston
    },
  },
);
