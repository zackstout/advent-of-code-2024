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
function getFastestPath(grid, start, end) {
  const queue = [{ ...start, cost: 0 }];
  const cache = new Map();

  while (queue.length > 0) {
    // TODO: test against pop -- hmm seems roughly same..
    const node = queue.pop();
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
      return cost;
    }

    // Oh wait we don't need/use this... just the set for visited needed, not the costs
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
}

const partOne = () => {
  const grid = data.split("\n").map((l) => l.trim());
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

  //   const firstBestScore = getFastestPath(grid, start, end);

  //   return getFastestPath(grid, start, end);

  //   const savings = {};

  //   // Check all vertical pairs of characters
  //   for (let i = 0; i < grid.length - 1; i++) {
  //     for (let j = 0; j < grid[0].length; j++) {
  //       const newGrid = [...grid.map((l) => [...l])];
  //       newGrid[i][j] = ".";
  //       newGrid[i + 1][j] = ".";
  //       //   console.log("vert", getFastestPath(newGrid, start, end));

  //       const fastest = getFastestPath(newGrid, start, end);
  //       const saving = firstBestScore - fastest;
  //       if (!savings[saving]) savings[saving] = 0;
  //       savings[saving] += 1;
  //     }
  //   }

  //   // Check all horizontal pairs of characters
  //   for (let i = 0; i < grid.length; i++) {
  //     for (let j = 0; j < grid[0].length - 1; j++) {
  //       const newGrid = [...grid.map((l) => [...l])];
  //       newGrid[i][j] = ".";
  //       newGrid[i][j + 1] = ".";
  //       //   console.log("hor", getFastestPath(newGrid, start, end));

  //       const fastest = getFastestPath(newGrid, start, end);
  //       const saving = firstBestScore - fastest;
  //       if (!savings[saving]) savings[saving] = [];
  //       savings[saving].push(fastest);
  //     }
  //   }

  // Since cheats are identified by starting position (first position before breaking through any walls),
  // we want to iterate through all "."s on the grid and ask how many cells can i reach in 3 steps?
  // any dots that lie within that "radius" should count as neighbors for the cell, right?
  // though we can only cheat once per race... hmm

  // I wonder would it help to initially run BFS from every "." position, not just from "S"?

  const cache = new Map();

  console.log(grid.length, grid[0].length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "#") {
        continue;
      }
      cache.set(`${i},${j}`, getFastestPath(grid, { r: i, c: j }, end));
      console.log(i * grid[0].length + j, "of", grid.length * grid[0].length);
    }
  }

  console.log("done with initial processing", cache.size);

  const result = {};

  for (const key of [...cache.keys()]) {
    // console.log("key", key);
    const [r, c] = key.split(",").map(Number);

    const neighbors = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ]
      .map((delta) => {
        return {
          r: r + delta[0],
          c: c + delta[1],
        };
      })
      .filter((n) => {
        return (
          n.r >= 0 && n.c >= 0 && n.r < grid.length && n.c < grid[0].length
        );
      })
      .filter((n) => {
        return grid[n.r][n.c] === "." || grid[n.r][n.c] === "E";
      });

    const score = cache.get(key);

    neighbors.forEach((n) => {
      const nodeScore = cache.get(`${n.r},${n.c}`);
      const savings = score - nodeScore - 2;
      if (savings > 0) {
        // console.log("better", n, savings);
        if (!result[savings]) result[savings] = 0;
        result[savings]++;
      }
    });

    // How many cheats starting from this square get us a path savings of at least X?
    // Look at at "."s that are within range of 3 from us.
    // Subtract its distance from us, from the difference between its cost and our cost.
    // (or something...)
    // But we also need to know the last square of the cheat... which also identifies it..
  }

  let count = 0;

  Object.keys(result).forEach((key) => {
    if (+key >= 100) {
      count += result[key];
    }
  });

  return count;

  return {
    r: grid.length,
    c: grid[0].length,
    // cache,
    result,
    first: cache.get(`${start.r},${start.c}`),
  };
};

// Ahh maybe the issue is that cheats are actually identified by position BEFORE it can go through walls...
// Still weird that we get a n 18-length savings path though... example doesn't have that..

// Oooooh I'm dumb. The position marked "2" is the end of the cheat -- and we have to be back on regular ground at that point. Got it.

// Ah ok yeah we got there. Laughably slow because we're computing cost of every single "." in grid, takes like 2 minutes.

// ==========================================================================================

function getManhattanDeltas(dist) {
  const result = new Set();

  const start = [0, 0, 0];
  const queue = [start];
  while (queue.length) {
    const [x, y, cost] = queue.shift();

    if (result.has([x, y].join(","))) {
      continue;
    }
    if (cost > dist) {
      continue;
    }

    queue.push([x + 1, y, cost + 1]);
    queue.push([x - 1, y, cost + 1]);
    queue.push([x, y + 1, cost + 1]);
    queue.push([x, y - 1, cost + 1]);

    result.add([x, y].join(","));
  }

  return result;
}

// Just copying from part one..except for manhattan distance.
// Should figure out faster way.. Maybe Dijkstra's for initial processing..
// Another smart thing would have been to cache this data in a file once we realized it was going to take 2 minutes to process lol.
// (and would likely be needed again)
const partTwo = () => {
  const grid = data.split("\n").map((l) => l.trim());
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

  const cache = new Map();

  console.log(grid.length, grid[0].length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "#") {
        continue;
      }
      cache.set(`${i},${j}`, getFastestPath(grid, { r: i, c: j }, end));
      console.log(i * grid[0].length + j, "of", grid.length * grid[0].length);
    }
  }

  console.log("done with initial processing", cache.size);

  const result = {};

  for (const key of [...cache.keys()]) {
    // console.log("key", key);
    const [r, c] = key.split(",").map(Number);

    const neighbors = [
      // [2, 0],
      // [-2, 0],
      // [0, 2],
      // [0, -2],
      ...getManhattanDeltas(20),
    ];

    neighbors.forEach((delta) => {
      //   console.log(delta);
      const d = delta.split(",").map(Number);
      const n = {
        r: r + d[0],
        c: c + d[1],
      };
      if (n.r < 0 || n.c < 0 || n.r >= grid.length || n.c >= grid[0].length) {
        return;
      }
      if (grid[n.r][n.c] === "." || grid[n.r][n.c] === "E") {
        const score = cache.get(key);
        const nodeScore = cache.get(`${n.r},${n.c}`);
        const nodeDist = Math.abs(d[0]) + Math.abs(d[1]);
        const savings = score - nodeScore - nodeDist;
        if (savings > 0) {
          // console.log("better", n, savings);
          if (!result[savings]) result[savings] = 0;
          result[savings]++;
        }
      }
    });
  }

  let count = 0;

  Object.keys(result).forEach((key) => {
    if (+key >= 100) {
      count += result[key];
    }
  });

  //   return result;

  return count;
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
