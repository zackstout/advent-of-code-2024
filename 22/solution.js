import { data } from "./input.js";

const ex = `1
10
100
2024`;

function advance(n) {
  //   console.log("advance", n);
  const res = n * 64;
  n ^= res;
  n %= 16777216;
  //   console.log(n);
  const r2 = Math.floor(n / 32);
  n ^= r2;
  n %= 16777216;
  //   console.log(n);
  const r3 = n * 2048;
  n ^= r3;
  n += 16777216 * 1000;
  n %= 16777216;
  //   console.log(n);
  return n;
}

const partOne = (input) => {
  //   return 1541105 ^ (1541105 * 2048);
  //   let x = 123;
  //   let times = 0;
  //   while (times < 10) {
  //     x = advance(x);
  //     console.log(x);
  //     times++;
  //   }

  let sum = 0;

  //   data
  input
    .split("\n")
    .map(Number)
    // .slice(1)
    .forEach((n) => {
      //   let x = n;
      //   n = 123;
      let x = n;
      console.log("n", n);
      let times = 0;
      while (times < 2000) {
        x = advance(x);
        times++;
      }
      //   console.log("x", x);
      sum += x;
    });

  return sum;
};

// oooh right, the first time it sees that sequence for each buyer, it will buy.

const partTwo = (input) => {
  const cache = new Map();

  let max = 0;
  let maxK = "";

  const ex2 = `1
2
3
2024`;

  let keys = input.split("\n").map(Number);

  //   keys = [123];

  keys.forEach((n) => {
    let prev = null;
    let times = 0;
    let x = n;
    let diffs = [];
    const seen = new Set();

    while (times < 2000) {
      prev = x;
      x = advance(x);
      //   const diff = (x - prev) % 10;
      const diff = (x % 10) - (prev % 10);
      diffs.push(diff);
      while (diffs.length > 4) {
        diffs.shift();
      }

      const k = diffs.join(",");
      //   console.log(k, x % 10);

      if (seen.has(k)) {
        // Ahhhh this was the bug, nice
        times++;
        continue;
      }

      seen.add(k);

      if (diffs.length === 4) {
        // console.log(k, x % 10);

        // Needed parens around latter expression
        const val = (x % 10) + (cache.get(k) ?? 0);
        if (val > max) {
          max = val;
          maxK = k;
        }
        // if (k === "-2,1,-1,3") {
        //   console.log(val, n);
        // }
        cache.set(k, val);
        // console.log(k, val);
      }

      times++;
    }
  });

  //   cache.set(1, 10);

  // return Math.max(...cache.values());
  //   return cache.get("-2,1,-1,3");
  //   return cache;
  return { max, maxK };
};

const ex3 = `2021
5017
19751`;

const ex4 = `5053
10083
11263`;

// Hmm 2005 is too low...
// 2150 is too high....
console.time("solution");
console.log("Result one:", partOne(data));
console.log("Result: ", partTwo(data));
console.timeEnd("solution");
