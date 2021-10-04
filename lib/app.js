import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import animalsController from '../lib/controllers/animalsController.js';

const app = express();

app.use(express.json());

app.use('/api/animals', animalsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
