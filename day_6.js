import {
  __,
  add,
  append,
  countBy,
  compose,
  concat,
  curry,
  equals,
  filter,
  find,
  flip,
  gt,
  head,
  ifElse,
  inc,
  indexOf,
  join,
  last,
  length,
  map,
  match,
  modulo,
  nth,
  prepend,
  prop,
  replace,
  reverse,
  until,
  scan,
  slice,
  sort,
  sortBy,
  split,
  splitAt,
  sum,
  tail,
  take,
  transpose,
  toLower,
  toPairs,
  unnest,
} from "ramda";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;

// getKeyWithHighestValue :: {*} -> String
const getKeyWithHighestValue = compose(prop(0), last, sortBy(prop(1)), toPairs);

// getKeyWithLowestValue :: {*} -> String
const getKeyWithLowestValue = compose(prop(0), head, sortBy(prop(1)), toPairs);

// getMostFrequentLetter :: [Char] -> Char
const getMostFrequentLetter = compose(getKeyWithHighestValue, countBy(toLower));

// getLeastFrequentLetter :: [Char] -> Char
const getLeastFrequentLetter = compose(getKeyWithLowestValue, countBy(toLower));

// unscrambleMessage :: String -> String
const unscrambleMessage = compose(join(""), map(getMostFrequentLetter), transpose, map(split("")), split("\n"));

// unscrambleOriginalMessage :: String -> String
const unscrambleOriginalMessage = compose(join(""), map(getLeastFrequentLetter), transpose, map(split("")), split("\n"));

// unscrambleMessageFromFile :: FilePath -> Task Error String
const unscrambleMessageFromFile = compose(map(unscrambleMessage), readAsString);

// unscrambleOriginalMessageFromFile :: FilePath -> Task Error String
const unscrambleOriginalMessageFromFile = compose(map(unscrambleOriginalMessage), readAsString);

unscrambleMessageFromFile("input/day_6.txt").fork(console.error, (message) => {
  console.log(`The message is: '${message}'`);
});

unscrambleOriginalMessageFromFile("input/day_6.txt").fork(console.error, (message) => {
  console.log(`The original message is: '${message}'`);
});
