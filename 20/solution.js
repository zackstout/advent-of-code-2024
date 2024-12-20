import { data } from "./input.js";

const ex = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

// Nice, got it, basic BFS.
const partOne = () => {
  const grid = ex.split("\n").map((l) => l.trim());
  const start = {};
  const end = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "S") {
        start.r = i;
        start.c = j;
      }
      if (grid[i][j] === "E") {
        end.r = i;
        end.c = j;
      }
    }
  }

  const queue = [{ ...start, cost: 0 }];
  const cache = new Map();

  while (queue.length > 0) {
    // TODO: test against pop
    const node = queue.shift();
    const { r, c, cost } = node;
    const key = `${r},${c}`;
    if (cache.has(key)) continue;
    if (c < 0 || r < 0 || r >= grid.length || c >= grid[0].length) {
      continue;
    }
    if (grid[r][c] === "#") {
      continue;
    }
    if (r === end.r && c === end.c) {
      //   console.log("Got a path!", cost);
      //   allPaths.push(seen);
      break;
    }

    cache.set(key, cost + 1);

    const neighbors = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ].map((delta) => {
      return {
        r: r + delta[0],
        c: c + delta[1],
        cost: cost + 1,
      };
    });

    neighbors.forEach((n) => queue.push(n));
  }
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
