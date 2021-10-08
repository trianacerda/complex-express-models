const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('complex-express-models-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const dogSpecies = {
    species: 'Canine',
    extinct: false,
  };

  const catSpecies = {
    species: 'Feline',
    extinct: false,
  };

  const pigSpecies = {
    species: 'Pig',
    extinct: false,
  };

  const dogAnimal = {
    animal: 'Dog',
    name: 'Mister',
    species_id: '1',
  };

  const catAnimalT = {
    animal: 'Cat',
    name: 'Tony THE Tiger',
    species_id: '2',
  };

  const pigAnimal = {
    animal: 'Pig',
    name: 'Panda',
    species_id: '3',
  };

  const catAnimalB = {
    animal: 'Cat',
    name: 'Bella Bae',
    species_id: '2',
  };

  it('should add a new species', () => {
    return request(app)
      .post('/api/species')
      .send(dogSpecies)
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          species: 'Canine',
          extinct: false,
        });
      });
  });

  it('should get ALL species', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/species').send(catSpecies);
    await request(app).post('/api/species').send(pigSpecies);
    return await request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: '1',
            species: 'Canine',
            extinct: false,
          },
          {
            id: '2',
            species: 'Feline',
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

  it('should add a dog animal', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    return await request(app)
      .post('/api/animals')
      .send(dogAnimal)
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Dog',
          name: 'Mister',
          species_id: '1',
        });
      });
  });

  it('should get animal by id', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/animals').send(dogAnimal);
    return await request(app)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Dog',
          name: 'Mister',
          species_id: '1',
        });
      });
  });

  it('should update an animal with /patch by id', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/animals').send(dogAnimal);
    await request(app).patch('/api/animals/1').send({
      name: 'Luna-Girl',
    });
    return await request(app)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Dog',
          name: 'Luna-Girl',
          species_id: '1',
        });
      });
  });

  it('should delete an animal id', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/animals').send(dogAnimal);
    return await request(app)
      .delete('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('should get ALL animals WITH their speicies ID, async', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/species').send(catSpecies);
    await request(app).post('/api/species').send(pigSpecies);
    await request(app).post('/api/animals').send(dogAnimal);
    await request(app).post('/api/animals').send(catAnimalT);
    await request(app).post('/api/animals').send(pigAnimal);
    await request(app).post('/api/animals').send(catAnimalB);
    return await request(app)
      .get('/api/animals')
      .then((res) => {
        expect(res.body).toEqual([
          { ...dogAnimal, id: '1', species: 'Canine' },
          { ...catAnimalT, id: '2', species: 'Feline' },
          { ...pigAnimal, id: '3', species: 'Pig' },
          { ...catAnimalB, id: '4', species: 'Feline' },
        ]);
      });
  });

  it('should get a count of animals by their species', async () => {
    await request(app).post('/api/species').send(dogSpecies);
    await request(app).post('/api/species').send(catSpecies);
    await request(app).post('/api/species').send(pigSpecies);
    await request(app).post('/api/animals').send(dogAnimal);
    await request(app).post('/api/animals').send(catAnimalT);
    await request(app).post('/api/animals').send(pigAnimal);
    await request(app).post('/api/animals').send(catAnimalB);
    return await request(app)
      .get('/api/animals/count')
      .then((res) => {
        expect(res.body).toEqual([
          { species: 'Feline', animals: '2' },
          { species: 'Canine', animals: '1' },
          { species: 'Pig', animals: '1' },
        ]);
      });
  });

  it('update a species extinct key with PATCH', async () => {
    await request(app).post('/api/species').send(pigSpecies);
    await request(app).patch('/api/species/1').send({ id: '1', extinct: true });

    return await request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual({
          ...pigSpecies,
          extinct: true,
          id: '1',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
