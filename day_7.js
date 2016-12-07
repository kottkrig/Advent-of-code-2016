import {
  all,
  any,
  aperture,
  both,
  countBy,
  complement,
  compose,
  equals,
  filter,
  head,
  join,
  last,
  length,
  map,
  match,
  not,
  prop,
  reverse,
  sortBy,
  split,
  transpose,
  toLower,
  toPairs,
} from "ramda";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;
const Ip7Address = String;

// extractHypernetSequences :: String -> [String]
const extractHypernetSequences = match(/[^[\]]+(?=])/g);

// extractHypernetSequences :: String -> [String]
const extractIp = match(/([^[\]]+)(?=$|\[)/g);

// isPalindrome :: String -> Boolean
const isPalindrome = (string) => compose(equals(string), reverse)(string);

// containsMoreThanOneLetter :: String -> Boolean
const containsMoreThanOneLetter = (string) => compose(not, all(equals(head(string))))(string);

// isValidFourCharacterCombination :: String -> Boolean
const isValidFourCharacterCombination = both(containsMoreThanOneLetter, isPalindrome);

// isAnyTrue :: [Boolean] -> Boolean
const isAnyTrue = any(equals(true));

// containsAbba :: String -> Boolean
const containsAbba = compose(isAnyTrue, map(isValidFourCharacterCombination), map(join("")), aperture(4));

// hyperNetSequenceContainsAbba :: Ip7Address -> Boolean
const hyperNetSequenceContainsAbba = compose(isAnyTrue, map(containsAbba), extractHypernetSequences);

// hyperNetSequenceDoesNotContainAbba :: Ip7Address -> Boolean
const hyperNetSequenceDoesNotContainAbba = complement(hyperNetSequenceContainsAbba);

// ipContainsAbba :: Ip7Address -> Boolean
const ipContainsAbba = compose(isAnyTrue, map(containsAbba), extractIp);

// isValidAddress :: Ip7Address -> Boolean
const isValidAddress = both(hyperNetSequenceDoesNotContainAbba, ipContainsAbba);

// getNumberOfIPSWithTLS :: [Ip7Address] -> Number
const getNumberOfIPSWithTLS = compose(length, filter(isValidAddress));

// extractAddresses :: String -> [Ip7Address]
const extractAddresses = split("\n");

// getNumberOfIPSWithTLSInFile :: FilePath -> Task Error Number
const getNumberOfIPSWithTLSInFile = compose(map(getNumberOfIPSWithTLS), map(extractAddresses), readAsString);

getNumberOfIPSWithTLSInFile("input/day_7.txt").fork(console.error, (numberOfValidAddresses) => {
  console.log("Number of IPs that support TLS:", numberOfValidAddresses);
});
