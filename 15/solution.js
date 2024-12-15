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

const ex2 = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const ex3 = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`;

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

  //   return times;

  return Object.keys(gridMap).reduce((sum, key) => {
    let add = 0;
    if (gridMap[key] === "O") {
      const [y, x] = key.split(",").map(Number);
      add = 100 * y + x;
    }

    return sum + add;
  }, 0);
};

// ===========================================================================

// So moving e/w is pretty much the same as part one...
// but for n/s, we need to find all the affected boxes...and their entire "footprint" to see if whole chunk can move...
// footprint of self is [0,-1] and [-1,-1]
// footprint of box is [-1,-1], [0,-1], and [1,-1]

const partTwo = () => {
  const [grid, dirs] = data.split("\n\n").map((x, i) => {
    if (i === 0) return x.split("\n");
    return x.split("");
  });

  let pos = { x: 0, y: 0 };
  const gridMap = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      gridMap[`${i},${j * 2}`] = grid[i][j];
      gridMap[`${i},${j * 2 + 1}`] = grid[i][j];
      if (grid[i][j] === "O") {
        gridMap[`${i},${j * 2}`] = "b";
        gridMap[`${i},${j * 2 + 1}`] = ".";
      }
      if (grid[i][j] === "@") {
        pos.x = j * 2;
        pos.y = i;
        // Don't store position of self on the map
        gridMap[`${i},${j * 2}`] = ".";
        gridMap[`${i},${j * 2 + 1}`] = ".";
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
      for (let j = 0; j < grid[0].length * 2; j++) {
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

  //   return render();

  let times = 0;

  function getBox(i, j) {
    // return gridMap[`${i},${j}`] === "b" || gridMap[`${i},${j - 1}`] === "b";
    if (gridMap[`${i},${j}`] === "#") return { wall: true };

    if (gridMap[`${i},${j}`] === "b") return { x: j, y: i };
    if (gridMap[`${i},${j - 1}`] === "b") return { x: j - 1, y: i };
    return null;
  }

  while (dirs.length > 0 && times < 1_000_000) {
    // render();
    // console.log("+++++++++++++++++++++++");
    const dir = dirs.shift();
    if (!dirsDict[dir]) continue;

    times++;
    // console.log("Move", dir, times);

    // We want to find the "footprint" recursively (finding each fp's own fp in turn)
    // whether we are going e/w, or n/s
    // and then move all those boxes that occurred in any footprint, if we can, at once.

    const next = { ...pos };
    next.x += dirsDict[dir][0];
    next.y += dirsDict[dir][1];
    let nextVal = gridMap[`${next.y},${next.x}`];

    if (nextVal === "#") {
      // Do nothing, it's a wall
    } else if (!getBox(next.y, next.x)) {
      // Move directly there, it's a dot
      pos = { ...next };
    } else {
      // It's a box!
      const box = getBox(next.y, next.x);
      const toMove = [];
      const queue = [box];
      let hitWall = false;
      while (queue.length > 0) {
        // Add its neighbors to queue
        const node = queue.shift();
        if (!node) continue;

        if (node.wall) {
          hitWall = true;
          break;
        }
        // console.log("n", node, dir, box);
        switch (dir) {
          case ">":
            // const nextBox = getBox(box.y, box.x-1);
            // if (nextBox) {
            //   queue.push(nextBox);
            // }
            queue.push(getBox(node.y, node.x + 2));
            break;
          case "<":
            // Aha!!! this has to be minus 1, not minus 2
            queue.push(getBox(node.y, node.x - 1));
            break;
          case "v":
            queue.push(getBox(node.y + 1, node.x));
            queue.push(getBox(node.y + 1, node.x + 1));
            break;
          case "^":
            const b1 = getBox(node.y - 1, node.x);
            const b2 = getBox(node.y - 1, node.x + 1);
            queue.push(b1);
            queue.push(b2);
            break;
        }
        toMove.push(node);
      }

      //   console.log("to move", toMove);

      if (!hitWall) {
        const newSpots = toMove.map((b) => {
          return { x: b.x + dirsDict[dir][0], y: b.y + dirsDict[dir][1] };
        });
        toMove.forEach((box) => {
          // Move the box
          gridMap[`${box.y},${box.x}`] = ".";
          //   gridMap[`${box.y + dirsDict[dir][1]},${box.x + dirsDict[dir][0]}`] =
          //     "b";
        });
        newSpots.forEach((box) => {
          gridMap[`${box.y},${box.x}`] = "b";
        });

        // Move yourself
        pos = { ...next };
      }
    }

    // console.log(dir, pos);
  }

  render();

  //
  //   return { grid, dirs, gridMap };

  //   return pos;

  //   return render();

  //   return times;

  return Object.keys(gridMap).reduce((sum, key) => {
    let add = 0;
    const [y, x] = key.split(",").map(Number);
    if (gridMap[key] === "b") {
      add = 100 * y + x;
    }

    return sum + add;
  }, 0);
};

// Hmm... so for part two we are handling the small example right...
console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
