const pool = require('../utils/pool');

module.exports = class Animals {
  id;
  animal;
  name;
  species_id;

  constructor(row) {
    this.id = row.id;
    this.animal = row.animal;
    this.name = row.name;
    this.species_id = row.species_id;
  }

  static async insert({ animal, name, species_id }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (animal, name, species_id) VALUES ($1,$2,$3) RETURNING *',
      [animal, name, species_id]
    );
    return new Animals(rows[0]);
  }
};
