import {
  __,
  all,
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
  equals,
  filter,
  head,
  ifElse,
  insertAll,
  join,
  last,
  length,
  map,
  match,
  nth,
  not,
  prop,
  update,
  reduce,
  repeat,
  replace,
  reverse,
  slice,
  sortBy,
  split,
  sum,
  transpose,
  toLower,
  toPairs,
} from "ramda";

import { readAsRows, readAsString } from "./utils/file";
import { log } from "./utils/log";

const FilePath = String;
const DisplayRow = [Number];
const Display = [DisplayRow];
const Instruction = String;

// rotateBackwards :: [*] -> [*]
const rotateBackwards = curry((length, array) => concat(slice(length, array.length, array), slice(0, length, array)));

// rotateForwards :: [*] -> [*]
const rotateForwards = curry((length, array) => concat(slice(array.length - length, array.length, array), slice(0, array.length - length, array)));

// createDisplay :: Number -> Number :: Display
const createDisplay = (columns, rows) => repeat(repeat(0, columns), rows);

// rotateRow :: Number -> Number -> Display -> Display
const rotateRow = curry((index, length, display) => compose(update(index, __, display), rotateForwards(length), nth(index))(display));

// rotateColumn :: Number -> Number -> Display -> Display
const rotateColumn = curry((index, length, display) => compose(transpose, rotateRow(index, length), transpose)(display));

// drawRect :: Number -> Number -> Display -> Display
const drawRect = curry((width, height, display) => concat(compose(map(insertAll(0, repeat(1, width))), map(drop(width)), slice(0, height))(display), slice(height, display.length, display)));

// displayToString :: Display -> String
const displayToString = compose(replace(/0/g, " "), replace(/1/g, "*"), join("\n"), map(join("")));

const executeInstruction = curry((display, instructionString) => {
  if (contains("rect", instructionString)) {
    let [width, height] = map(parseInt)(match(/\d{1,2}/g, instructionString));
    return drawRect(width, height, display);
  }

  if (contains("rotate column", instructionString)) {
    let [index, length] = map(parseInt)(match(/\d{1,2}/g, instructionString));
    return rotateColumn(index, length, display);
  }

  if (contains("rotate row", instructionString)) {
    let [index, length] = map(parseInt)(match(/\d{1,2}/g, instructionString));
    return rotateRow(index, length, display);
  }

  return display;
});

// countLitPixels :: Display -> Number
const countLitPixels = compose(sum, map(sum));

// extractInstructions :: String -> [String]
const extractInstructions = split("\n");

// executeInstructionsOnDisplay :: Display -> [String] -> Display
const executeInstructionsOnDisplay = reduce(executeInstruction);

// countLitPixelsOnDisplayAfterInstructions :: Display -> [String] -> Number
const countLitPixelsOnDisplayAfterInstructions = curry((display, instructions) => compose(countLitPixels, executeInstructionsOnDisplay)(display, extractInstructions(instructions)));

const countLitPixelsOnDisplayAfterInstructionsInFile = compose(map(log("string")), readAsString);

readAsString("input/day_8.txt").fork(console.error, (input) => {
  const emptyDisplay = createDisplay(50, 6);
  const pixelCount = countLitPixelsOnDisplayAfterInstructions(emptyDisplay, input);
  console.log("Number of lit pixels", pixelCount);

  console.log("");
  console.log(displayToString(executeInstructionsOnDisplay(emptyDisplay, extractInstructions(input))));
});
