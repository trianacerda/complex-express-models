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

  it('should get ALL species', async () => {
    await request(app).post('/api/species').send(
      {
        species: 'Amphibians',
        extinct: true,
      },
      {
        species: 'Fish',
        extinct: false,
      },
      {
        species: 'Canine',
        extinct: false,
      }
    );
    return await request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: '1',
            species: 'Amphibians',
            extinct: true,
          },
          {
            id: '2',
            species: 'Fish',
            extinct: false,
          },
          {
            id: '3',
            species: 'Canine',
            extinct: false,
          }
        );
      });
  });

  it('should add a new animal', () => {
    const newAnimal = {
      animal: 'Dog',
      name: 'Mister',
    };
    return request(app)
      .post('/api/species')
      .send(newAnimal)
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Dog',
          name: 'Mister',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
