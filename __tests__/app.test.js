const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('complex-express-models-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const newSpecies = {
    species: 'Amphibians',
    extinct: true,
  };
  it('should add a new species', () => {
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

  it('should add a new animal', async () => {
    const newAnimal = {
      animal: 'Dog',
      name: 'Mister',
      species_id: '1',
    };
    await request(app).post('/api/species').send(newSpecies);
    return await request(app)
      .post('api/animals')
      .send(newAnimal)
      .then((res) => {
        console.log('res.body', res.body);
        expect(res.body).toEqual({
          id: '1',
          animal: 'Dog',
          name: 'Mister',
          species_id: '1',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
