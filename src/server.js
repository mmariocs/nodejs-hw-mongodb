import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getContactById, getAllContacts } from './services/contact.js';

const PORT = Number(getEnvVar('PORT', '3000'));
const app = express();
export const setupServer = () => {
  app.use(express.json());
  app.use(cors());
};

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({ data: contacts });
});

app.get('/contacts/:ObjectIdId', async (req, res) => {
  const { ObjectIdId } = req.params;
  const contact = await getContactById(ObjectIdId);

  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }
  res.status(200).json({
    data: contact,
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
