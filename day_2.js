import { compose, map, reduce, curry, prop, split, join, mapAccum } from "ramda";

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

// getCodeDigit :: Point -> Number
const getCodeDigit = ({ x, y }) => keypad[y][x];

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
const getNextCoordinateForSteps = reduce(getNextCoordinate);

// getLastCoordinateForSteps :: Point -> [[Step]] -> [Point]
const getLastCoordinateForSteps = (startPoint, instructions) => map(getNextCoordinateForSteps(startPoint))(instructions);

// getCode :: Point -> [[Step]] -> String
const getCode = compose(join(""), map(getCodeDigit), getLastCoordinateForSteps);

// parseInstructions :: FilePath -> Task Error [[Step]]
const parseInstructions = compose(map(getInstructions), readAsString);

parseInstructions("input/day_2.txt").fork(console.error, (instructions) => {
  const startPoint = { x: 1, y: 1 };
  console.log("The bathroom code is:", getCode(startPoint, instructions));
});
