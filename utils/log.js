import { curry } from "ramda";

export const log = curry((description, x) => {
  console.log(description, x);
  return x;
});
