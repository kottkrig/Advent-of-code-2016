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
  gt,
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

const trapTile = "^"
const safeTile = "."

const Tile = String;
const Row = String;

// getLeftTile :: Number -> Row -> Tile
const getLeftTile = (i, row) => ifElse(gt(i, 0), always(row[i - 1]), always(safeTile));

// getRightTile :: Number -> Row -> Tile
const getRightTile = (i, row) => ifElse(lt(i, row.length - 1), always(row[i + 1]), always(safeTile));

const getCenterTile = (i, row) => always(row[i]);

const isLeftAndCenterTraps = (i, row) => and()

// isTrap :: Number -> Boolean
// const isTrap =

const FilePath = String;
