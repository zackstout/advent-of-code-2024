import { data } from "./input.js";

const test = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const test2 = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

const partOne = () => {
  const grid = data.split("\n").map((l) => l.split("").map(Number));
  // For each "0" in the map (trailhead), we need to answer, how many "9"s can it reach?

  function rateTrailhead(r, c) {
    // console.log("rating...", r, c);
    const queue = [{ x: c, y: r }];
    const reached = new Set();
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const val = grid[y][x];
      if (val === 9) {
        reached.add(`${x},${y}`);
      }
      const ds = [
        [1, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
      ];
      ds.forEach((d) => {
        if (grid[y + d[0]]?.[x + d[1]] === val + 1) {
          //   console.log("add to queue", { x: x + d[1], y: y + d[0] });
          queue.push({ x: x + d[1], y: y + d[0] });
        }
      });
    }
    console.log(reached);
    return reached.size;
  }

  let total = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        total += rateTrailhead(r, c);
      }
    }
  }

  return total;
};

const partTwo = () => {
  const grid = data.split("\n").map((l) => l.split("").map(Number));
  // For each "0" in the map (trailhead), we need to answer, how many "9"s can it reach?

  function rateTrailhead(r, c) {
    // console.log("rating...", r, c);
    const queue = [{ x: c, y: r }];

    // Only difference for part two is to use an array rather than a set
    // and really all we need is a counter..
    // const reached = new Set();
    const reached = [];

    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const val = grid[y][x];
      if (val === 9) {
        // reached.add(`${x},${y}`);
        reached.push([x, y]);
      }
      const ds = [
        [1, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
      ];
      ds.forEach((d) => {
        if (grid[y + d[0]]?.[x + d[1]] === val + 1) {
          //   console.log("add to queue", { x: x + d[1], y: y + d[0] });
          queue.push({ x: x + d[1], y: y + d[0] });
        }
      });
    }
    console.log(reached);
    return reached.length;
  }

  let total = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        total += rateTrailhead(r, c);
      }
    }
  }

  return total;
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
