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

const partTwo = () => {};

// hahaha yes we got there, took 7 minutes but ok
// I wonder if the way to speed it up is to only use corner nodes...
// and we can set up each one to have a cost associated with reaching it of each straight line leading to it....
// Yeah that feels super promising.
// Maybe using a heap to always get the min cost state??

console.time("solution");
// console.log("Result: ", partOne());
console.timeEnd("solution");

const main = () => {
  // const inputs = Deno.readTextFileSync(INPUT_FILE).split("\n");

  const inputs = data.split("\n");

  const maze = inputs.map((row) => row.split(""));
  const start = [0, 0];
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "S") {
        start[0] = i;
        start[1] = j;
      }
    }
  }

  function printMaze(pt) {
    console.log("\x1Bc");
    const temp = Array.from({ length: maze.length }, () =>
      Array.from({ length: maze[0].length }, () => "")
    );

    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (pt[0] === i && pt[1] === j) {
          temp[i][j] = "@";
        } else {
          temp[i][j] = maze[i][j];
        }
      }
    }

    console.log(temp.map((row) => row.join("")).join("\n"));
    let wait = 100;
    if (maze[pt[0]][pt[1]] === "E") {
      wait = 1000;
    }
    const waitTill = new Date(new Date().getTime() + wait);
    while (waitTill > new Date()) {}
    console.log("\n");
  }

  const DIR_TO_MOVEMENT = {
    0: [-1, 0], // UP
    1: [0, 1], // RIGHT
    2: [1, 0], // DOWN
    3: [0, -1], // LEFT
  };

  const ptWiseMinScore = {};

  let queue = [[...start, 1, 0]];
  let res = Infinity;

  while (queue.length) {
    const newQueue = [];
    for (const pt of queue) {
      const [x, y, face, score] = pt;

      const posKey = `${x},${y}`;
      const cacheKey = `${posKey},${face}`;
      // Bounds and wall check
      if (
        x < 0 ||
        y < 0 ||
        x >= maze.length ||
        y >= maze[0].length ||
        maze[x][y] === "#" ||
        ptWiseMinScore[cacheKey] < score
      ) {
        continue;
      }

      ptWiseMinScore[cacheKey] = score;
      // printMaze([x, y])

      // End condition
      if (maze[x][y] === "E") {
        // console.log(queue)
        if (score < res) {
          res = score;
        }
        continue;
      }
      const availableMoves = [face, (face + 1) % 4, (face + 3) % 4];

      for (const move of availableMoves) {
        const [dx, dy] = DIR_TO_MOVEMENT[move];
        const nextPos = [x + dx, y + dy];
        const nextScore = score + (face === move ? 1 : 1001);
        newQueue.push([...nextPos, move, nextScore]);
      }
    }

    queue = newQueue;
  }

  return res;
};

console.time("main");
console.log(main());
console.timeEnd("main");
