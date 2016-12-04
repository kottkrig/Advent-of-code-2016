import {
  countBy,
  compose,
  equals,
  filter,
  join,
  map,
  match,
  prop,
  replace,
  reverse,
  slice,
  sort,
  sortBy,
  split,
  sum,
  toLower,
  toPairs,
} from "ramda";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;
const SectorId = Number;
const Hash = Number;
const Name = Number;

// extractHash :: String -> Hash
const extractHash = compose(prop(1), match(/\[(.*?)\]/));

// extractEncryptedName :: String -> SectorId
const extractSectorId = compose(parseInt, replace(/^\D+/g, ""));

// extractEncryptedName :: String -> Name
const extractEncryptedName = (string) => string.substring(0, string.lastIndexOf("-")).replace(/-/g, "");

const sortByOccurances = (a, b) => {
  if (a[1] === b[1]) {
    return a[0] < b[0] ? 1 : -1;
  } else {
    return a[1] - b[1];
  }
};

// countLetters :: String -> {*}
const countLetters = compose(sort(sortByOccurances), toPairs, countBy(toLower));

// createHash :: String -> Hash
const createHash = compose(join(""), map(prop(0)), slice(0, 5), reverse, countLetters, extractEncryptedName);

// isRowReal :: String -> Boolean
const isRowReal = (encryptedRow) => equals(createHash(encryptedRow), extractHash(encryptedRow));

// extractRows :: String -> [String]
const extractRows = compose(split("\n"));

// getSumOfRealSectorIdsFromString :: String -> Number
const getSumOfRealSectorIdsFromString = compose(sum, map(extractSectorId), filter(isRowReal), extractRows);

// getSumOfRealSectorIdsFromFile :: FilePath -> Task Error Number
const getSumOfRealSectorIdsFromFile = compose(map(getSumOfRealSectorIdsFromString), readAsString);

getSumOfRealSectorIdsFromFile("input/day_4.txt").fork(console.error, (sumOfValidSectorIds) => {
  console.log("Sum of valid sector ids:", sumOfValidSectorIds);
});
