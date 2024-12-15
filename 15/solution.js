import { data } from "./input.js";

const ex = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

const partOne = () => {
  const [grid, dirs] = data.split("\n\n").map((x, i) => {
    if (i === 0) return x.split("\n");
    return x.split("");
  });

  let pos = { x: 0, y: 0 };
  const gridMap = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      gridMap[`${i},${j}`] = grid[i][j];
      if (grid[i][j] === "@") {
        pos.x = j;
        pos.y = i;
        // Don't store position of self on the map
        gridMap[`${i},${j}`] = ".";
      }
    }
  }

  const dirsDict = {
    "^": [0, -1],
    v: [0, 1],
    ">": [1, 0],
    "<": [-1, 0],
  };

  function render() {
    const res = [];
    for (let i = 0; i < grid.length; i++) {
      let row = "";
      for (let j = 0; j < grid[0].length; j++) {
        if (pos.x === j && pos.y === i) {
          row += "@";
        } else {
          row += gridMap[`${i},${j}`];
        }
      }
      res.push(row);
    }
    res.forEach((row) => console.log(row));
  }

  let times = 0;

  while (dirs.length > 0) {
    // render();
    // console.log("+++++++++++++++++++++++");
    const dir = dirs.shift();
    if (!dirsDict[dir]) continue;

    times++;
    // console.log("Move", dir);

    const next = { ...pos };
    next.x += dirsDict[dir][0];
    next.y += dirsDict[dir][1];
    let nextVal = gridMap[`${next.y},${next.x}`];
    if (nextVal === "#") {
      // Do nothing, it's a wall
    } else if (nextVal === ".") {
      // Move directly there, it's a dot -- maybe can collapse into next case
      pos = { ...next };
    } else if (nextVal === "O") {
      // Find how far we can move, and if we can move at all
      const first = { ...next };
      while (gridMap[`${next.y},${next.x}`] === "O") {
        next.x += dirsDict[dir][0];
        next.y += dirsDict[dir][1];
      }
      nextVal = gridMap[`${next.y},${next.x}`];
      if (nextVal === "#") {
        // Wall, do nothing
      } else if (nextVal === ".") {
        // We can move!
        gridMap[`${next.y},${next.x}`] = "O";
        gridMap[`${first.y},${first.x}`] = ".";
        pos = { ...first };
      }
    }
    // console.log(dir, pos);
  }

  //
  //   return { grid, dirs, gridMap };

  //   return pos;

  return times;

  return Object.keys(gridMap).reduce((sum, key) => {
    let add = 0;
    if (gridMap[key] === "O") {
      const [y, x] = key.split(",").map(Number);
      add = 100 * y + x;
    }

    return sum + add;
  }, 0);
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
