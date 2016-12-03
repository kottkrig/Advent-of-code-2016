import {
  compose,
  map,
  split,
  splitEvery,
  match,
  filter,
  length,
  transpose,
  unnest,
} from "ramda";

import { readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;
const Triangle = [Number];

// extractTriangleFromString :: String -> Triangle
const extractTriangleFromString = compose(map(parseInt), match(/\S+/g));

// extractTrianglesFromRows :: String -> [Triangle]
const extractTrianglesFromRows = compose(map(extractTriangleFromString), split("\n"));

// convertRowTrianglesToColumnTriangles :: [Triangle] -> [Triangle]
const convertRowTrianglesToColumnTriangles = compose(unnest, map(transpose), splitEvery(3));

// isTriangleValid :: Triangle -> Boolean
const isTriangleValid = ([a, b, c]) => a + b > c &&  b + c > a && a + c > b;

// getValidTriangles :: [Triangle] -> [Triangle]
const getValidTriangles = filter(isTriangleValid);

// getNumberOfValidTriangles :: [Triangle] -> Number
const getNumberOfValidTriangles = compose(length, getValidTriangles);

// getNumberOfValidTrianglesInString :: String -> Number
const getNumberOfValidTrianglesInString = compose(getNumberOfValidTriangles, extractTrianglesFromRows);

// getNumberOfValidTrianglesInString :: String -> Number
const getNumberOfValidColumnTrianglesInString = compose(getNumberOfValidTriangles, convertRowTrianglesToColumnTriangles, extractTrianglesFromRows);

// getNumberOfValidTrianglesInFile :: FilePath -> Task Error Number
const getNumberOfValidTrianglesInFile = compose(map(getNumberOfValidTrianglesInString), readAsString);

// getNumberOfValidTrianglesInFile :: FilePath -> Task Error Number
const getNumberOfValidColumnTrianglesInFile = compose(map(getNumberOfValidColumnTrianglesInString), readAsString);

getNumberOfValidTrianglesInFile("input/day_3.txt").fork(console.error, (numberOfPossibleTriangles) => {
  console.log("A: Number of possible triangles:", numberOfPossibleTriangles);
});
getNumberOfValidColumnTrianglesInFile("input/day_3.txt").fork(console.error, (numberOfPossibleTriangles) => {
  console.log("B: Number of possible column triangles:", numberOfPossibleTriangles);
});
