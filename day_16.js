import {
  __,
  all,
  always,
  any,
  aperture,
  both,
  countBy,
  complement,
  compose,
  concat,
  contains,
  curry,
  drop,
  either,
  equals,
  filter,
  gte,
  head,
  ifElse,
  insertAll,
  join,
  last,
  length,
  lte,
  map,
  match,
  modulo,
  nth,
  not,
  or,
  prepend,
  prop,
  update,
  reduce,
  repeat,
  replace,
  reverse,
  slice,
  sortBy,
  split,
  splitEvery,
  sum,
  take,
  transpose,
  toLower,
  toPairs,
  until,
} from "ramda";

import { readAsRows, readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;

// flip :: Char -> Char
const flip = ifElse(equals("0"), always("1"), always("0"));

// appendGeneratedData :: String -> String
const appendGeneratedData = (a) => compose(join(""), prepend(a), prepend("0"), join(""), map(flip), split(""), reverse)(a);

// lengthGreaterThan :: Number -> String -> Boolean
const lengthGreaterThan = curry((l, s) => compose(lte(l), length, split(""))(s));

// generateData :: Number -> String -> String
const generateData = (dataLength, initialData) => compose(take(dataLength), until(lengthGreaterThan(dataLength), appendGeneratedData))(initialData);

// generateChecksumForPair :: String -> String
const generateChecksumForPair = ifElse(either(equals("11"), equals("00")), always("1"), always("0"));

// lengthIsOdd :: String -> Boolean
const lengthIsOdd = compose(equals(1), modulo(__, 2), length);

// runChecksumPass :: String -> String
const runChecksumPass = compose(join(""), map(generateChecksumForPair), splitEvery(2));

// generateChecksum :: String -> String
const generateChecksum = until(lengthIsOdd, runChecksumPass);

// generateData :: Number -> String -> String
const getChecksumForGeneratedData = compose(generateChecksum, generateData);

console.log("Checksum for data:", getChecksumForGeneratedData(272, "11110010111001001"));
