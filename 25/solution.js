import { data } from "./input.js";

const ex = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

const partOne = () => {
  const keys = [];
  const locks = [];

  data.split("\n\n").forEach((thing) => {
    // console.log("thing", thing);
    const lines = thing.split("\n");
    const cols = [-1, -1, -1, -1, -1];
    const isLock = lines[0][0] === "#";
    lines.forEach((line, idx) => {
      //   console.log("val", line[idx]);
      line.split("").forEach((char, j) => {
        cols[j] += char === "#" ? 1 : 0;
      });
    });
    const arr = isLock ? locks : keys;
    arr.push(cols);
  });

  function doesFit(k, l) {
    // console.log("fits", k, l);
    for (let i = 0; i < k.length; i++) {
      if (k[i] + l[i] > 5) return false;
    }
    return true;
  }

  let count = 0;

  keys.forEach((key) => {
    locks.forEach((lock) => {
      if (doesFit(key, lock)) {
        count++;
      }
    });
  });

  return count;
  return { keys, locks };
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
