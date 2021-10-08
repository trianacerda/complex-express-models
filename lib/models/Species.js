const pool = require('../utils/pool');

module.exports = class Species {
  id;
  species;
  extinct;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.extinct = row.extinct;
  }

  static async insert({ species, extinct }) {
    const { rows } = await pool.query(
      'INSERT INTO species (species, extinct) VALUES ($1,$2) RETURNING *',
      [species, extinct]
    );
    return new Species(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM species');
    return new Species(rows[0]);
  }

  static async update(id, { extinct }) {
    const { rows } = await pool.query(
      'UPDATE species SET extinct = $2 WHERE id=$1 RETURNING *;',
      [id, extinct]
    );
    return new Species(rows[0]);
  }
};
