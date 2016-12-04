import {
  add,
  countBy,
  compose,
  curry,
  equals,
  filter,
  find,
  flip,
  gt,
  ifElse,
  indexOf,
  join,
  map,
  match,
  modulo,
  nth,
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
  unnest,
} from "ramda";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const FilePath = String;
const SectorId = Number;
const Hash = Number;
const Name = String;
const DecryptedRow = { Name, SectorId };

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

// rotateLetter :: Char -> Char
const rotateLetter = (letter, rotations) => compose(flip(nth)(alphabet), flip(modulo)(alphabet.length), add(rotations), flip(indexOf)(alphabet))(letter);

const rotateChar = (char, rotations) => ifElse(equals("-"), () => " ", flip(rotateLetter)(rotations))(char);

const decryptName = (name, sectorId) => compose(join(""), map(flip(rotateChar)(sectorId)))(name);

const decryptRow = (row) => {
  const sectorId = extractSectorId(row);
  const name = extractEncryptedName(row);
  return { name: decryptName(name, sectorId), sectorId };
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

// decryptRealSectorNamesFromString :: String -> [DecryptedRow]
const decryptRealSectorNamesFromString = compose(map(decryptRow), filter(isRowReal), extractRows);

// decryptRealSectorNamesFromString :: FilePath -> Task Error [DecryptedRow]
const decryptRealSectorNamesFromFile = compose(map(decryptRealSectorNamesFromString), readAsString);

// stringIncludesSubString :: String -> String -> Boolean
const stringIncludesSubString = curry((substring, string) => compose(flip(gt)(-1), indexOf)(substring, string));

// String -> Boolean
const nameIncludesNorth = compose(stringIncludesSubString("north"), prop("name"));

getSumOfRealSectorIdsFromFile("input/day_4.txt").fork(console.error, (sumOfValidSectorIds) => {
  console.log("Sum of valid sector ids:", sumOfValidSectorIds);
});

decryptRealSectorNamesFromFile("input/day_4.txt").fork(console.error, (realSelectorNames) => {
  const { sectorId } = find(nameIncludesNorth, realSelectorNames);
  console.log("The north pole objects are in sector:", sectorId);
});
