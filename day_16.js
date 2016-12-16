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

const generateChecksumForPair = ifElse(or(equals("11"), equals("00")), always("1"), always("0"));

const lengthIsOdd = compose(equals(0), modulo(__, 2), length);

const generateChecksum = until(lengthIsOdd, compose(join(""), map(generateChecksumForPair), log("splitEvery"), splitEvery(2)));

console.log(appendGeneratedData("111100001010") === "1111000010100101011110000");
console.log("lengthGreaterThan:", lengthGreaterThan(10, "1111"));
console.log("generateData:", generateData(10, "1111"));
console.log("lengthIsOdd:", lengthIsOdd("111"));
console.log("generateChecksum:", generateChecksum("110010110100"));
