const pool = require('../utils/pool');

module.exports = class Species {
  id;
  species;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
  }

  static async insert({ species }) {
    const { rows } = await pool.query(
      'INSERT INTO species (species) VALUES ($1) RETURNING *',
      [species]
    );
    return new Species(rows[0]);
  }
};
