import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

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
    /* 404 and 500 */
  }

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  {
    /* start server */
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
