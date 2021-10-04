const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/species', require('./controllers/speciesController'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
