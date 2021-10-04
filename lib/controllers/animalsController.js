const { Router } = require('express');
const Animals = require('../models/Animals');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const animalData = req.body;
    const savedAnimalData = Animals.insert(animalData);
    res.send(savedAnimalData);
  } catch (error) {
    next(error);
  }
});
