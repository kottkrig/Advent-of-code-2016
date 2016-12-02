import { compose, map, reduce, curry, prop, split } from "ramda";

import { readAsString } from "./utils/file";
import { mod } from "./utils/math";
import { log } from "./utils/log";

const Point = { Number, Number };
const Step = String;
const FilePath = String;

const keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// getSteps :: String -> [Step]
const getSteps = (instructionsString) => instructionsString.split("");

// getInstructions :: String -> [[Step]]
const getInstructions = compose(map(getSteps), split("\n"));

// getCodeNumber :: Point -> Number
const getCodeNumber = ({ x, y }) => keypad[y][x];

// getNextCoordinate :: Point -> Step -> Point
const getNextCoordinate = ({ x, y }, instruction) => {
  if (instruction === "U" && y > 0) {
    return { x, y: y - 1 };
  } else if (instruction === "D" && y < keypad.length - 1) {
    return { x, y: y + 1 };
  }  else if (instruction === "R" && x < keypad[y].length - 1) {
    return { x: x + 1, y };
  } else if (instruction === "L" && x > 0) {
    return { x: x - 1, y };
  } else {
    return { x, y };
  }
};

// getNextCoordinateForSteps :: Point -> [Step] -> Point
const getNextCoordinateForSteps = (startPoint, instructionString) => compose(reduce(getNextCoordinate, startPoint), getSteps)(instructionString);

// getNextCodeNumber :: Point -> [Step] -> Number
const getNextCodeNumber = compose(getCodeNumber, log("nextCoordinate"), getNextCoordinateForSteps);

// getLastCoordinateForSteps :: Point -> [[Steps]] -> [Point]
const getLastCoordinateForSteps = compose(reduce(), reduce(getNextCoordinateForSteps));


// parseInstructions :: FilePath -> Task Error [[Step]]
const parseInstructions = compose(map(getInstructions), readAsString);

parseInstructions("input/day_2.txt").fork(console.error, (instructions) => {
  console.log("instructions", instructions);
});

// console.log("nextNumber:", getNextCodeNumber({ x: 2, y: 2 }, "LURDL"));
