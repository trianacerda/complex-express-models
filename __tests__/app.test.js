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
      Species: 'Amphibians',
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({
          Species: 'Amphibians',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
