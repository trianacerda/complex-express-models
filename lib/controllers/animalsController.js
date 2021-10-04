import { Router } from 'express';
import Animals from '../lib/models/Animals.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const animalData = req.body;
    const savedAnimalData = Animals.insert(animalData);
    res.send(savedAnimalData);
  } catch (error) {
    next(error);
  }
});
