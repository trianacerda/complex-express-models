const pool = require('../utils/pool');

module.exports = class Animals {
  id;
  animal;
  name;
  species_id;
  species;
  animals;

  constructor(row) {
    this.id = row.id;
    this.animal = row.animal;
    this.name = row.name;
    this.species_id = row.species_id;
    this.species = row.species;
    this.animals = row.animals;
  }

  static async insert({ animal, name, species_id }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (animal, name, species_id) VALUES ($1,$2,$3) RETURNING *',
      [animal, name, species_id]
    );
    return new Animals(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM animals WHERE id = $1', [
      id,
    ]);
    return new Animals(rows[0]);
  }

  static async patchById(id, { name }) {
    const { rows } = await pool.query(
      'UPDATE animals SET name = $2 WHERE id = $1 RETURNING *;',
      [id, name]
    );
    return new Animals(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM animals WHERE id = $1', [
      id,
    ]);
    return new Animals(rows);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT animals.id, animal, name, species_id, species FROM animals 
    INNER JOIN species 
    ON species.id = animals.species_id
    `);
    return rows.map((row) => new Animals(row));
  }

  static async getCount() {
    const { rows } = await pool.query(`
    SELECT species.species, COUNT (*) AS animals FROM animals 
    INNER JOIN species 
    ON species.id = animals.species_id
    GROUP BY species.species

    `);
    return rows.map((row) => new Animals(row));
  }
};
