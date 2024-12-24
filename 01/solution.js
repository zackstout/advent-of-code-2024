import { data } from "./input.js";

const test = `3   4
    4   3
    2   5
    1   3
    3   9
    3   3
    `;

const partOne = (x) => {
  const lines = x
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const numbers = lines.map((line) => {
    const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
    return [a, b];
  });

  const list1 = numbers.map(([a, b]) => a).sort((a, b) => a - b);
  const list2 = numbers.map(([a, b]) => b).sort((a, b) => a - b);

  const diffs = list1.map((a, i) => Math.abs(a - list2[i]));

  return diffs.reduce((a, b) => a + b, 0);
};

const partTwo = (x) => {
  const lines = x
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const numbers = lines.map((line) => {
    const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
    return [a, b];
  });

  const list1 = numbers.map(([a, b]) => a).sort((a, b) => a - b);
  const list2 = numbers.map(([a, b]) => b).sort((a, b) => a - b);

  const freqs = {};

  for (const x of [...new Set(list1)]) {
    for (const y of list2) {
      if (x === y) {
        if (!freqs[x]) {
          freqs[x] = 1;
        } else {
          freqs[x] += 1;
        }
      }
    }
  }

  let total = 0;
  for (const x of list1) {
    if (freqs[x]) {
      total += x * freqs[x];
      //   console.log(x, freqs[x]);
    }
  }

  return total;
};

console.time("p1");
console.log("Result: ", partOne(data));
console.timeEnd("p1");

console.time("p2");
console.log("Result: ", partTwo(data));
console.timeEnd("p2");
