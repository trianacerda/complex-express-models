const { Router } = require('express');
const Animals = require('../models/Animals');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const animalData = req.body;
    console.log('data', animalData);
    const savedAnimalData = await Animals.insert(animalData);
    res.send(savedAnimalData);
  } catch (error) {
    next(error);
  }
});
