import { data } from "./input.js";

const test = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const partOne = () => {
  const grid = test.split("\n");
  // For each "0" in the map (trailhead), we need to answer, how many "9"s can it reach?
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
