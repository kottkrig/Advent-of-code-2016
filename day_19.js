import {
  __,
  all,
  always,
  and,
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
  findIndex,
  gt,
  gte,
  head,
  ifElse,
  indexOf,
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

const puzzleInput = 3014387;

// rotateBackwards :: Number -> [a] -> [a]
const rotateBackwards = curry((length, array) => concat(slice(length, array.length, array), slice(0, length, array)));

const shiftLeft = rotateBackwards(1);

const elves = repeat(1, puzzleInput)

const getNextElfIndex = findIndex(gt(__, 0));

const getValueFromNextElfIndex = (elves) => compose(nth(__, elves), getNextElfIndex)(elves);

const stealNextElfsPresents = (elves) => compose(nth(__, elves), getNextElfIndex)(elves);

// stealPresents :: [Elves] -> [Elves]
const stealPresents = until(compose(gt(__, -1), indexOf(puzzleInput)))

console.log(getNextElfIndex([0,1,1]))
