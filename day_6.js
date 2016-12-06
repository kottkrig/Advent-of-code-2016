import {
  countBy,
  compose,
  head,
  join,
  last,
  map,
  prop,
  sortBy,
  split,
  transpose,
  toLower,
  toPairs,
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
const unscrambleMessage = (unscrambleFunc) => compose(join(""), map(unscrambleFunc), transpose, map(split("")), split("\n"));

// unscrambleMessageFromFile :: FilePath -> Task Error String
const unscrambleMessageFromFile = compose(map(unscrambleMessage(getMostFrequentLetter)), readAsString);

// unscrambleOriginalMessageFromFile :: FilePath -> Task Error String
const unscrambleOriginalMessageFromFile = compose(map(unscrambleMessage(getLeastFrequentLetter)), readAsString);

unscrambleMessageFromFile("input/day_6.txt").fork(console.error, (message) => {
  console.log(`The message is: '${message}'`);
});

unscrambleOriginalMessageFromFile("input/day_6.txt").fork(console.error, (message) => {
  console.log(`The original message is: '${message}'`);
});
