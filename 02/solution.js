import { data } from "./input.js";

const test = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const isIncreasing = (arr) => {
  return arr.slice(1).every((n, i) => n - arr[i] >= 1 && n - arr[i] <= 3);
};

const isDecreasing = (arr) => {
  return arr.slice(1).every((n, i) => arr[i] - n >= 1 && arr[i] - n <= 3);
};

const isMonotonic = (arr) => {
  return isIncreasing(arr) || isDecreasing(arr);
};

const isMonotonic2 = (arr) => {
  if (isMonotonic(arr)) return true;
  for (let i = 0; i <= arr.length - 1; i++) {
    const newArr = arr.slice();
    newArr.splice(i, 1);
    if (isMonotonic(newArr)) return true;
  }
  return false;
};

const partOne = (x) => {
  const lines = x.split("\n").map((l) => l.split(" ").map((n) => +n));

  return lines.filter((l) => isMonotonic(l)).length;
};

const partTwo = (x) => {
  const lines = x.split("\n").map((l) => l.split(" ").map((n) => +n));

  return lines.filter((l) => isMonotonic2(l)).length;
};
// 411 is too low.. ahh probably because we skipped last element of array... Yep, nice.

console.time("solution");
console.log("Result: ", partTwo(data));
console.timeEnd("solution");
