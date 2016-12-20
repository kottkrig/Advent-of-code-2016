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
  ifElse,
  inc,
  indexOf,
  join,
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
  take,
  toLower,
  toPairs,
  unnest,
} from "ramda";

import md5 from "blueimp-md5";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;

// hasLeadingZeroes :: String -> Boolean
const hasLeadingZeroes = compose(equals("00000"), take(5));

// getPasswordChar :: String -> Char
const getPasswordChar = nth(5);

// getMd5ForIndex :: Number -> String
const getMd5ForIndex = compose(md5, concat("abbhdwsy"));

// isValidIndex :: Number -> Boolean
const isValidIndex = compose(hasLeadingZeroes, getMd5ForIndex);

// getPasswordCharFromIndex :: Number -> Char
const getPasswordCharFromIndex = compose(getPasswordChar, getMd5ForIndex);

// getNextPasswordChar :: Number -> Number
const getNextValidIndex = until(isValidIndex, inc);

// getNextPasswordChar :: Number -> Char
const getNextPasswordChar = compose(getPasswordChar, getMd5ForIndex, getNextValidIndex);

const hasLength8 = compose(gt(__, 7), length);

const getCode = () => {
  var index = 0;
  var array = [];
  while (array.length < 8) {
    const nextValidIndex = getNextValidIndex(index);
    array.push(nextValidIndex);
    index = nextValidIndex + 1;
  }

  const code = array.map(getPasswordCharFromIndex);

  return code.join("");
};

console.log("The code to the first door is:", getCode());
