import { data } from "./input.js";

const test = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const partOne = (input) => {
  const obstacles = new Set();
  const visited = new Set();
  let guard = null;
  let guardStart = null;
  const lines = input.split("\n").map((line) => line.trim());
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") {
        obstacles.add(`${x},${y}`);
      }
      if (lines[y][x] === "^") {
        visited.add(`${x},${y}`);
        guard = { x, y, dir: "N" };
        guardStart = { x, y };
      }
    }
  }
  while (true) {
    const { x, y, dir } = guard;
    let nextX = x;
    let nextY = y;
    const DIRS = "NESW";
    if (dir === "N") {
      nextY -= 1;
    } else if (dir === "E") {
      nextX += 1;
    } else if (dir === "S") {
      nextY += 1;
    } else if (dir === "W") {
      nextX -= 1;
    }
    const nextPos = `${nextX},${nextY}`;
    if (nextX >= lines[0].length || nextY >= lines.length) {
      break;
    }

    if (obstacles.has(nextPos)) {
      // Turn that guard!
      guard.dir = DIRS.concat(DIRS)[DIRS.indexOf(dir) + 1];
    } else {
      guard.x = nextX;
      guard.y = nextY;
      visited.add(nextPos);
    }
  }
  return { visited, obstacles, guardStart };
};

const partTwo = (input) => {
  const { visited, obstacles, guardStart } = partOne(input);

  function wouldLoop(x, y) {
    // const obsts = [...obstacles].concat(`${x},${y}`);
    const obsts = new Set();
    for (const x of obstacles) {
      obsts.add(x);
    }
    obsts.add(`${x},${y}`);
    let guard = { ...guardStart, dir: "N" };
    const visited = new Set();

    // console.log("testing", x, y);

    let res = false;
    let times = 0;

    const lines = input.split("\n").map((line) => line.trim());

    while (true) {
      times++;
      const { x, y, dir } = guard;
      if (visited.has(`${x},${y},${dir}`)) {
        res = true;
        break;
      }
      let nextX = x;
      let nextY = y;
      visited.add(`${x},${y},${dir}`);
      const DIRS = "NESW";
      if (dir === "N") {
        nextY -= 1;
      } else if (dir === "E") {
        nextX += 1;
      } else if (dir === "S") {
        nextY += 1;
      } else if (dir === "W") {
        nextX -= 1;
      }
      const nextPos = `${nextX},${nextY}`;
      if (
        nextX >= lines[0].length ||
        nextY >= lines.length ||
        nextX < 0 ||
        nextY < 0
      ) {
        // console.log("times", times);
        return false;
      }

      if (obsts.has(nextPos)) {
        // Turn that guard!
        guard.dir = DIRS.concat(DIRS)[DIRS.indexOf(dir) + 1];
      } else {
        guard.x = nextX;
        guard.y = nextY;
      }
    }

    return res;
  }

  let total = 0;

  for (const pos of visited) {
    const [x, y] = pos.split(",").map(Number);

    if (wouldLoop(x, y)) {
      total++;
    }
  }

  return total;
};

console.time("solution");
console.log("Result: ", partTwo(data));
console.timeEnd("solution");
