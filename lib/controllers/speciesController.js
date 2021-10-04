const { Router } = require('express');
const Species = require('../models/Species');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const speciesData = req.body;
      const newSpeciesData = await Species.insert(speciesData);
      res.send(newSpeciesData);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getAllSpecies = await Species.getAll();
      res.send(getAllSpecies);
    } catch (error) {
      next(error);
    }
  });
