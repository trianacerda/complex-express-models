const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('complex-express-models-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new species', () => {
    const newSpecies = {
      species: 'Amphibians',
      extinct: true,
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          species: 'Amphibians',
          extinct: true,
        });
      });
  });

  xit('should get ALL species', () => {
    const newSpecies1 = {
      species: 'Amphibians',
    };
    const newSpecies2 = {
      species: 'Amphibians',
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies1)
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          species: 'Amphibians',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
