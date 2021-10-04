const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');
const speciesController = require('./controllers/speciesController');

const app = express();

app.use(express.json());

app.use('/api/species', speciesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
