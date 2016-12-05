import {
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
  ifElse,
  inc,
  indexOf,
  join,
  map,
  match,
  modulo,
  nth,
  prepend,
  prop,
  replace,
  reverse,
  until,
  slice,
  sort,
  sortBy,
  split,
  splitAt,
  sum,
  toLower,
  toPairs,
  unnest,
} from "ramda";

import md5 from "blueimp-md5";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;

// hasLeadingZeroes :: String -> Boolean
const hasLeadingZeroes = compose(equals("00000"), prop(0), splitAt(5));

// getPasswordChar :: String -> Char
const getPasswordChar = nth(5);

// getMd5ForIndex :: Number -> String
const getMd5ForIndex = compose(md5, concat("abc"));

// isValidIndex :: Number -> Boolean
const isValidIndex = compose(hasLeadingZeroes, getMd5ForIndex);

// getNextPasswordChar :: Number -> Char
const getNextPasswordChar = compose(getPasswordChar, getMd5ForIndex, getNextValidIndex);

// getNextValidIndex :: Number -> Number
const getNextValidIndex = until(isValidIndex, inc);

console.log(getNextPasswordChar(0));
// console.log(concat("abc")(123));
