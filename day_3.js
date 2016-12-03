import { compose, map, reduce, curry, prop, split, join, mapAccum, match, filter, length } from "ramda";

import { readAsString } from "./utils/file";
import { mod } from "./utils/math";
import { log } from "./utils/log";

const FilePath = String;
const Triangle = [Number];

// extractTriangleFromString :: String -> Triangle
const extractTriangleFromString = compose(map(parseInt), match(/\S+/g));

// extractTrianglesFromString :: String -> [Triangle]
const extractTrianglesFromString = compose(map(extractTriangleFromString), split("\n"));

// isTriangleValid :: Triangle -> Boolean
const isTriangleValid = ([a, b, c]) => a + b > c &&  b + c > a && a + c > b;

// getValidTriangles :: [Triangle] -> [Triangle]
const getValidTriangles = filter(isTriangleValid);

// getNumberOfValidTrianglesInString :: String -> Number
const getNumberOfValidTrianglesInString = compose(length, getValidTriangles, extractTrianglesFromString);

// getNumberOfValidTrianglesInFile :: FilePath -> Task Error Number
const getNumberOfValidTrianglesInFile = compose(map(getNumberOfValidTrianglesInString), readAsString);

getNumberOfValidTrianglesInFile("input/day_3.txt").fork(console.error, (numberOfPossibleTriangles) => {
  console.log("Number of possible triangles:", numberOfPossibleTriangles);
});
