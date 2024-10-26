import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', 3000));
export const setupServer = () => {
  {
    /* setup server */
  }

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  {
    /* Routes */
  }

  app.use(contactsRouter);

  {
    /* 404 and 500 */
  }

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  {
    /* start server */
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
