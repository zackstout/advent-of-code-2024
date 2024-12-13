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
    console.log(numTimes);
  }

  return curr.length;
};

const partTwo = () => {};

// Huh, got the test in like 3 seconds...taking a while for real input though, almost a minute, almost entirely on final step
console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
