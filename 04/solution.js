import { data } from "./input.js";

// const test = `..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....`;

const test = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const getWord = (x, y, dx, dy, grid) => {
  let word = grid[y][x];
  while (grid[y + dy] && grid[y + dy][x + dx] && word.length < 4) {
    x += dx;
    y += dy;
    word += grid[y][x];
  }
  return word;
};

const partOne = () => {
  const grid = data.split("\n").map((l) => l.split(""));
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === ".") continue;
      const deltas = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1],
        [-1, 0],
        [0, -1],
        [-1, -1],
        [-1, 1],
      ];

      for (let [dx, dy] of deltas) {
        const word = getWord(x, y, dx, dy, grid);
        if (word === "XMAS") {
          total++;
        }
      }
    }
  }
  return total;
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
