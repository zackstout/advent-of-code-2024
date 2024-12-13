import { data } from "./input.js";

const test = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const partOne = () => {
  const lines = data.split("\n").map((line) =>
    line.split(": ").map((x, i) => {
      if (i === 0) return +x;
      return x.split(" ").map(Number);
    })
  );
  let totalValid = 0;
  for (const line of lines) {
    const [target, parts] = line;
    // console.log(target, parts);

    for (let i = 0; i < Math.pow(2, parts.length - 1); i++) {
      let x = i.toString(2);
      while (x.length < parts.length - 1) {
        x = "0" + x;
      }

      // x is a binary number that represents the choices we should try for each slot (+ or *)

      let res = parts[0];
      //   console.log(x);
      for (let j = 0; j < parts.length - 1; j++) {
        const char = x[j];
        const num = parts[j + 1];
        if (char === "0") {
          res += num;
        } else {
          res *= num;
        }
      }

      if (res === target) {
        totalValid += target;
        console.log("Valid", target, x);
        break;
      }
    }
  }
  return totalValid;
};

const partTwo = () => {
  const lines = data.split("\n").map((line) =>
    line.split(": ").map((x, i) => {
      if (i === 0) return +x;
      return x.split(" ").map(Number);
    })
  );
  let totalValid = 0;
  for (const line of lines) {
    const [target, parts] = line;
    // console.log(target, parts);

    for (let i = 0; i < Math.pow(3, parts.length - 1); i++) {
      let x = i.toString(3);
      while (x.length < parts.length - 1) {
        x = "0" + x;
      }

      // x is a TERNARY number that represents the choices we should try for each slot (+ or * OR ||)

      let res = parts[0];
      //   console.log(x);
      for (let j = 0; j < parts.length - 1; j++) {
        const char = x[j];
        const num = parts[j + 1];
        if (char === "0") {
          res += num;
        } else if (char === "1") {
          res *= num;
        } else {
          res = parseInt(res.toString() + num, 10);
        }
      }

      if (res === target) {
        totalValid += target;
        // console.log("Valid", target, x);
        break;
      }
    }
  }
  return totalValid;
};

console.time("solution");

// Nice, part1 is 538191549061
// and part two, all we need is to change binary to ternary, sweet -- does take like 8 seconds though
console.log("Result: ", partTwo());
console.timeEnd("solution");
