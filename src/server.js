import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import { getAllContacts, getContactById } from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found!',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}`,
      data: contact,
    });
  });

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
