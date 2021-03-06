DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  species TEXT NOT NULL,
  extinct BOOLEAN
);

CREATE TABLE animals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  animal TEXT NOT NULL,
  name TEXT NOT NULL,
  species_id BIGINT NOT NULL, 
  FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);
