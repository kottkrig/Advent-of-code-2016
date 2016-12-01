import { compose, map, reduce, curry, prop } from 'ramda';

import { readAsString } from './utils/file';
import { mod } from './utils/math';

const Instruction = String;
const Direction = String;
const Distance = Number;
const RelativeDirection = String; // 'L' or 'R'
const Point = { Number, Number };

const GridPoint = { Direction, Point };

const directions = ['N', 'E', 'S', 'W'];

// extractInstructions :: String -> [Instruction]
const extractInstructions = (s) => s.split(', ');

// getInstructions :: String -> Task Error [Instruction]
const getInstructions = compose(map(extractInstructions), readAsString);

// distanceBetweenPoints :: Point -> Point -> Number
const distanceBetweenPoints = curry((p1, p2) => (p1.x - p2.x) + (p1.y - p2.y));

// getNewDirection :: Direction -> RelativeDirection -> Direction
const getNewDirection = (d, rd) => directions[mod(directions.indexOf(d) + (rd === 'R' ? 1 : -1), directions.length)];

// extractRelativeDirection :: Instruction -> RelativeDirection
const extractRelativeDirection = (instruction) => instruction[0];

// extractDistance :: Instruction -> Number
const extractDistance = (instruction) => parseInt(instruction.substr(1));

// createNewPoint :: Point -> Direction -> Distance -> Point
const createNewPoint = ({ x, y }, direction, distance) => {
  if (direction === 'N') {
    return { x: x, y: y + distance };
  } else if (direction === 'S') {
    return { x: x, y: y - distance };
  } else if (direction === 'W') {
    return { x: x - distance, y: y };
  } else if (direction === 'E') {
    return { x: x + distance, y: y };
  }
};

// getNextGridPoint :: GridPoint -> Instruction -> GridPoint
const getNextGridPoint = (gridPoint, instruction) => {
  const newDirection = getNewDirection(gridPoint.direction, extractRelativeDirection(instruction));
  return { direction: newDirection, point: createNewPoint(gridPoint.point, newDirection, extractDistance(instruction)) };
};

// getFinalGridPoint :: GridPoint -> [Instruction] -> GridPoint
const getFinalGridPoint = reduce(getNextGridPoint);

// runExercise1 = String -> Task Error Number
const runExercise1 = (startPoint) => compose(distanceBetweenPoints(startPoint.point), prop('point'), getFinalGridPoint(startPoint));

getInstructions('input/day_1.txt').fork(console.error, (instructions) => {
  // instructions.forEach((instruction) => console.log(`'${instruction}'`));
  const startPoint = { direction: 'N', point: { x: 0, y: 0 } };
  const distance = runExercise1(startPoint)(instructions);
  console.log('Distance to Easter Bunny HQ:', Math.abs(distance));
});
