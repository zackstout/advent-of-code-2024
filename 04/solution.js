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

const test2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
`;

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

const partTwo = () => {
  const grid = data.split("\n").map((l) => l.split(""));
  let total = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] !== "A") continue;
      //   const n = grid[i - 1][j];
      //   const s = grid[i + 1][j];
      //   const e = grid[i][j + 1];
      //   const w = grid[i][j - 1];
      const ne = grid[i - 1][j + 1];
      const nw = grid[i - 1][j - 1];
      const se = grid[i + 1][j + 1];
      const sw = grid[i + 1][j - 1];

      // Ooooh wow, duh, this is "+", not "X"!!!!
      //   if (
      //     (n + s === "MS" || n + s === "SM") &&
      //     (e + w === "MS" || e + w === "SM")
      //   ) {
      //     total++;
      //     // continue;
      //   }
      if (
        (ne + sw === "MS" || ne + sw === "SM") &&
        (nw + se === "MS" || nw + se === "SM")
      )
        total++;
    }
  }

  // 2031 is too high..
  // 2027 is also too high, adding continue after first check..
  return total;
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
