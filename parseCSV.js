const fs = require('fs');

// const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
const read = (file) => fs.readFileSync(file, 'utf8').split('\n');
const write = (file, content) => fs.writeFileSync(file, content, 'utf8');

const toObject = function (keys, values) {
  const obj = {};
  keys.forEach((key, i) => obj[key] = +values[i] || values[i]);
  return obj;
};

const parseCSV = function (csv, separator, transformer = (x) => x) {
  const header = csv[0].split(separator);
  const lines = csv.slice(1);
  const json = lines.map((line) => {
    return transformer(toObject(header, line.split(separator)));
  });
  return json;
};

const toJSON = function (csvFile, jsonFile, separator, transformer) {
  const json = parseCSV(read(csvFile), separator, transformer);
  write(jsonFile, JSON.stringify(json));
};

const formatPokemon = function (pokemon) {
  pokemon.types = pokemon.types.split(',');
  // pokemon.name = capitalize(pokemon.name);
  // pokemon.types = pokemon.types.map(capitalize);
  return pokemon;
};

// toJSON('./poke.csv', './pokemon.json', '|', formatPokemon);
exports.parseCSV = parseCSV;