import { data } from "./input.js";

const partOne = () => {
  const test = [125, 17];

  let curr = data.split(" ").map(Number);
  console.log("Start", curr);

  let numTimes = 0;

  while (numTimes < 25) {
    const next = [];
    // console.log(numTimes, curr);

    while (curr.length > 0) {
      const n = curr.shift();
      if (n === 0) {
        next.push(1);
      } else if (n.toString(10).length % 2 === 0) {
        // split it
        const str = n.toString(10);
        const first = str.slice(0, str.length / 2);
        const second = str.slice(str.length / 2);
        next.push(parseInt(first));
        next.push(parseInt(second));
      } else {
        next.push(n * 2024);
      }
    }

    curr = next;
    numTimes++;
    console.log(numTimes, curr.length);
  }

  return curr.length;
};

const partTwo = () => {
  // Order of list doesn't matter, we can store frequency count, and we can cache results (??)

  let freqs = {};
  let curr = data.split(" ").map(Number);
  for (const x of curr) {
    if (freqs[x] === undefined) {
      freqs[x] = 0;
    }
    freqs[x]++;
  }
  let times = 0;

  function propagate(n) {
    if (n === 0) {
      return [1];
    } else if (n.toString(10).length % 2 === 0) {
      // split it
      const str = n.toString(10);
      const first = str.slice(0, str.length / 2);
      const second = str.slice(str.length / 2);
      return [parseInt(first), parseInt(second)];
    } else {
      return [n * 2024];
    }
  }

  console.log("start with", freqs);

  while (times < 75) {
    const newFreqs = {};

    for (const key of Object.keys(freqs)) {
      const res = propagate(parseInt(key));
      res.forEach((x) => {
        if (newFreqs[x] === undefined) {
          newFreqs[x] = 0;
        }
        newFreqs[x] += freqs[key];
      });
    }

    freqs = newFreqs;
    console.log("time", times);
    console.log(Object.values(freqs).reduce((acc, val) => acc + val, 0));
    times++;
  }

  return Object.values(freqs).reduce((acc, val) => acc + val, 0);
};

// Huh, got the test in like 3 seconds...taking a while for real input though, almost a minute, almost entirely on final step
console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
