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

const partOne = () => {
  const obstacles = new Set();
  const visited = new Set();
  let guard = null;
  const lines = data.split("\n").map((line) => line.trim());
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") {
        obstacles.add(`${x},${y}`);
      }
      if (lines[y][x] === "^") {
        visited.add(`${x},${y}`);
        guard = { x, y, dir: "N" };
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
      guard.dir = DIRS.concat(DIRS)[DIRS.indexOf(dir) + 1];
    } else {
      guard.x = nextX;
      guard.y = nextY;
      visited.add(nextPos);
    }
  }
  return visited.size;
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
