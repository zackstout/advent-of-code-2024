import { data } from "./input.js";

const test = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const test2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

// Use dijkstra's algorithm.
// Each vertex will be [i,j,dir]
// Begin with [si, sj, east], (all else with Infinity distance), and update its neighbors.
// Then iterate: take minimum distance node, visit it, update all its neighbors.

const partOne = () => {
  const grid = data.split("\n");
  const gridMap = {};
  const start = {};
  const end = {};
  grid.forEach((row, i) => {
    row.split("").forEach((char, j) => {
      gridMap[`${i},${j}`] = char;
      if (char === "S") {
        start.j = j;
        start.i = i;
        start.dir = "E";
      }
      if (char === "E") {
        end.j = j;
        end.i = i;
      }
    });
  });

  const dirs = "NESW";

  const dirDelts = {
    N: [0, -1],
    S: [0, 1],
    E: [1, 0],
    W: [-1, 0],
  };

  const left = (dir) => {
    const i = dirs.split("").indexOf(dir);
    return dirs[(i + 4 - 1) % 4];
  };

  const right = (dir) => {
    const i = dirs.split("").indexOf(dir);
    return dirs[(i + 4 + 1) % 4];
  };

  const allNodes = {};
  for (const key of Object.keys(gridMap)) {
    const [i, j] = key.split(",").map(Number);
    if (gridMap[key] === "#") continue;
    for (const dir of dirs) {
      //   const node = { i, j, dir, dist: Infinity };
      //   allNodes.push(node);
      const nodeKey = `${i},${j},${dir}`;
      allNodes[nodeKey] = Infinity;
    }
  }

  const totalNodes = Object.keys(allNodes).length;
  console.log("total nodes", totalNodes);

  const spanningSet = new Set();

  // Find min distance node (set it to start)
  const beginKey = `${start.i},${start.j},${start.dir}`;
  //   begin.dist = 0;
  allNodes[beginKey] = 0;
  // Add it to spanning set
  spanningSet.add(beginKey);
  // Update its neighbors -- straight or turn either direction
  const leftKey = `${start.i},${start.j},${left(start.dir)}`;
  const rightKey = `${start.i},${start.j},${right(start.dir)}`;
  const straightKey = `${start.i + dirDelts[start.dir][1]},${
    start.j + dirDelts[start.dir][0]
  },${start.dir}`;
  //   const leftTurn = { i: begin.i, j: begin.j, dir: left(begin.dir) };
  //   const rightTurn = { i: begin.i, j: begin.j, dir: right(begin.dir) };
  //   const straight = {
  //     i: begin.i + dirDelts[begin.dir][1],
  //     j: begin.j + dirDelts[begin.dir[0]],
  //     dir: begin.dir,
  //   };

  allNodes[leftKey] = Math.min(allNodes[leftKey], allNodes[beginKey] + 1000);
  allNodes[rightKey] = Math.min(allNodes[rightKey], allNodes[beginKey] + 1000);

  // Will be undefined if there is a wall there
  if (allNodes[straightKey] !== undefined) {
    allNodes[straightKey] = Math.min(
      allNodes[straightKey],
      allNodes[beginKey] + 1
    );
  }

  while (spanningSet.size < totalNodes) {
    // const availableKeys = Object.keys(allNodes).filter(
    //   (n) => !spanningSet.has(n)
    // );
    // const minDist = Math.min(...availableKeys.map((k) => allNodes[k]));
    // const node = Object.keys(allNodes).find(
    //   (k) => allNodes[k] === minDist && !spanningSet.has(k)
    // );

    let node = null;
    let minDist = Infinity;
    for (const key of Object.keys(allNodes)) {
      if (spanningSet.has(key)) continue;
      if (allNodes[key] < minDist) {
        minDist = allNodes[key];
        node = key;
      }
    }

    const [i, j, dir] = node.split(",");

    spanningSet.add(node);

    if (spanningSet.size % 100 === 0) {
      console.log(spanningSet.size);
    }
    const leftKey = `${i},${j},${left(dir)}`;
    const rightKey = `${i},${j},${right(dir)}`;
    // console.log(node);
    const straightKey = `${parseInt(i) + dirDelts[dir][1]},${
      parseInt(j) + dirDelts[dir][0]
    },${dir}`;

    allNodes[leftKey] = Math.min(allNodes[leftKey], allNodes[node] + 1000);
    allNodes[rightKey] = Math.min(allNodes[rightKey], allNodes[node] + 1000);

    // Will be undefined if there is a wall there
    if (allNodes[straightKey] !== undefined) {
      allNodes[straightKey] = Math.min(
        allNodes[straightKey],
        allNodes[node] + 1
      );
    }
  }

  const pathsToEnd = Object.keys(allNodes)
    .filter((n) => {
      const [i, j, dir] = n.split(",");
      return i == end.i && j == end.j;
    })
    .map((k) => allNodes[k]);

  return Math.min(...pathsToEnd);
};

// ============================================================================================================================================

// NOT using dijkstra's, but using BFS idea instead
const partTwo = () => {
  const grid = data.split("\n").map((line) => line.split(""));
  const start = {};
  const end = {};
  grid.forEach((row, i) => {
    row.forEach((char, j) => {
      if (char === "S") {
        start.j = j;
        start.i = i;
        start.dir = "E";
      }
      if (char === "E") {
        end.j = j;
        end.i = i;
      }
    });
  });

  const dirs = "NESW";

  console.log("end", end);

  const dirDelts = {
    N: [0, -1],
    S: [0, 1],
    E: [1, 0],
    W: [-1, 0],
  };

  const left = (dir) => {
    const i = dirs.split("").indexOf(dir);
    return dirs[(i + 4 - 1) % 4];
  };

  const right = (dir) => {
    const i = dirs.split("").indexOf(dir);
    return dirs[(i + 4 + 1) % 4];
  };

  const queue = [{ ...start, cost: 0, path: `${start.i},${start.j}` }];
  const visited = new Map();

  let minPathCost = Infinity;

  const allPaths = [];

  while (queue.length > 0) {
    const node = queue.shift();
    const { i, j, dir, cost, path } = node;
    const nodeKey = [i, j, dir].join(",");

    if (i >= grid.length || i < 0 || j < 0 || j > grid[0].length) {
      continue;
    }
    // Ahh yes... lol.. pretty important
    if (grid[i][j] === "#") {
      continue;
    }

    // Has to be <= cost, not <= cost + 1....
    if (visited.has(nodeKey) && visited.get(nodeKey) <= cost) {
      continue;
    }

    if (i === end.i && j === end.j) {
      // console.log("End!", cost);
      if (cost < minPathCost) {
        minPathCost = cost;
        // console.log("pushing...", cost);
      }
      allPaths.push({ cost, path });
    }

    const neighbors = [
      { ...node, dir: left(dir) },
      { ...node, dir: right(dir) },
      {
        ...node,
        i: i + dirDelts[dir][1],
        j: j + dirDelts[dir][0],
      },
    ];

    neighbors.forEach((n) => {
      queue.push({
        ...n,
        cost: cost + (n.dir === dir ? 1 : 1000),
        path: `${path}_${i},${j}`,
      });
    });

    visited.set(nodeKey, node.cost + 1);
  }

  const uniquePts = new Set();

  console.log(
    "min cost",
    minPathCost,
    "used paths",
    allPaths.filter((p) => p.cost === minPathCost).length
  );

  allPaths
    .filter((p) => p.cost === minPathCost)
    .forEach((path) => {
      path.path.split("_").forEach((pt) => {
        uniquePts.add(pt);
      });
    });

  return uniquePts.size + 1;
};

// hahaha yes we got there, took 7 minutes but ok
// I wonder if the way to speed it up is to only use corner nodes...
// and we can set up each one to have a cost associated with reaching it of each straight line leading to it....
// Yeah that feels super promising.
// Maybe using a heap to always get the min cost state??

// Ok buddy!!! Part 2 took 34 seconds but it's right!!!

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
