import { data } from "./input.js";

const test = `......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.`;

const partOne = () => {
  const grid = data.split("\n");
  const lookup = new Map();
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      const char = grid[i][j];
      if (char.match(/[a-zA-Z0-9]/g)) {
        if (!lookup.get(char)) {
          lookup.set(char, []);
        }
        lookup.get(char).push(`${j},${i}`);
      }
    }
  }

  // For each frequency, iterate through all pairs of antennae and determine positions of antinodes:
  const antinodes = new Set();

  for (const [key, nodes] of lookup) {
    console.log(key, nodes);

    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const first = nodes[i].split(",").map(Number);
        const second = nodes[j].split(",").map(Number);
        // console.log(first, second);
        const dx = first[0] - second[0];
        const dy = first[1] - second[1];
        const a1 = [first[0] + dx, first[1] + dy];
        const a2 = [second[0] - dx, second[1] - dy];

        // console.log(first, second, a1, a2);
        if (
          a1[0] >= 0 &&
          a1[0] < grid[0].length &&
          a1[1] >= 0 &&
          a1[1] < grid.length
        ) {
          antinodes.add(`${a1[0]},${a1[1]}`);
        }
        if (
          a2[0] >= 0 &&
          a2[0] < grid[0].length &&
          a2[1] >= 0 &&
          a2[1] < grid.length
        ) {
          antinodes.add(`${a2[0]},${a2[1]}`);
        }
      }
    }
  }

  console.log(antinodes);

  return antinodes.size;
};

const partTwo = () => {
  const grid = data.split("\n");
  const lookup = new Map();
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      const char = grid[i][j];
      if (char.match(/[a-zA-Z0-9]/g)) {
        if (!lookup.get(char)) {
          lookup.set(char, []);
        }
        lookup.get(char).push(`${j},${i}`);
      }
    }
  }

  // For each frequency, iterate through all pairs of antennae and determine positions of antinodes:
  const antinodes = new Set();

  for (const [key, nodes] of lookup) {
    console.log(key, nodes);

    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const first = nodes[i].split(",").map(Number);
        const second = nodes[j].split(",").map(Number);

        antinodes.add(`${first[0]},${first[1]}`);
        antinodes.add(`${second[0]},${second[1]}`);

        // console.log(first, second);
        const dx = first[0] - second[0];
        const dy = first[1] - second[1];

        // Go forward
        let newX = first[0] + dx;
        let newY = first[1] + dy;
        while (
          newX >= 0 &&
          newX < grid[0].length &&
          newY >= 0 &&
          newY < grid.length
        ) {
          antinodes.add(`${newX},${newY}`);
          newX += dx;
          newY += dy;
        }

        // Go backward
        let newX2 = second[0] - dx;
        let newY2 = second[1] - dy;
        while (
          newX2 >= 0 &&
          newX2 < grid[0].length &&
          newY2 >= 0 &&
          newY2 < grid.length
        ) {
          antinodes.add(`${newX2},${newY2}`);
          newX2 -= dx;
          newY2 -= dy;
        }
      }
    }
  }

  //   console.log(antinodes);

  return antinodes.size;
};

// Hmm, 266 is too high... ah dumb typo
console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
