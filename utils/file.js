import fs from 'fs';
import Task from 'data.task';
import { compose } from 'ramda';

// read :: String -> Task Error Buffer
const read = (path) => new Task((reject, resolve) => {
    fs.readFile(path, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });

// decode :: Task Error Buffer -> Task Error String
const decode = (buffer) => buffer.map(a => a.toString('utf-8'));

// readFileAsString :: String -> Task Error String
const readAsString = compose(decode, read);

module.exports = {
  read,
  decode,
  readAsString,
};
