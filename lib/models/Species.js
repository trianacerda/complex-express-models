const pool = require('../utils/pool');

module.exports = class Species {
  id;
  species;

  construtor(row) {
    this.id = row.id;
    this.species = row.species;
  }

  static async insert(speices) {
    const { rows } = await pool.query(
      'INSERT INTO species (speices) VALUES ($1) RETURNING *',
      [species]
    );
    return new Species(rows[0]);
  }
};
