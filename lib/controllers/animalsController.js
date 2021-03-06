const { Router } = require('express');
const Animals = require('../models/Animals');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const animalData = req.body;
      const savedAnimalData = await Animals.insert(animalData);
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const savedAnimalData = await Animals.getAll();
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  })
  .get('/count', async (req, res, next) => {
    try {
      const savedAnimalData = await Animals.getCount();
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const savedAnimalData = await Animals.getById(id);
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const savedAnimalData = await Animals.patchById(req.params.id, req.body);
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const savedAnimalData = await Animals.deleteById(req.params.id);
      res.send(savedAnimalData);
    } catch (error) {
      next(error);
    }
  });
