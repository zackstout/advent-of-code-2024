import { data } from "./input.js";

const lines = data.split("\n\n").map((chunk) => {
  const mat = [];
  const target = [];

  const line1 = chunk.split("\n")[0];
  const line2 = chunk.split("\n")[1];
  const l1 = line1.match(/(X|Y)\+(\d+)/g).map((x) => parseInt(x.slice(2)));
  const l2 = line2.match(/(X|Y)\+(\d+)/g).map((x) => parseInt(x.slice(2)));

  return {
    target: chunk.match(/(X|Y)=(\d+)/g).map((x) => parseInt(x.slice(2))),
    mat: [
      [l1[0], l2[0]],
      [l1[1], l2[1]],
    ],
  };
});

// console.log(lines.length, lines.slice(0, 3));

// Wow this feels like dark magic, awesome
const cramers = (mat, target) => {
  const det = mat[0][0] * mat[1][1] - mat[1][0] * mat[0][1];
  if (det === 0) return null;
  const detX = target[0] * mat[1][1] - target[1] * mat[0][1];
  const detY = mat[0][0] * target[1] - mat[1][0] * target[0];
  return { x: detX / det, y: detY / det };
};

const partOne = () => {
  //   return cramers(
  //     [
  //       [94, 22],
  //       [34, 67],
  //     ],
  //     [8400, 5400]
  //   );

  let totalCost = 0;

  lines.forEach((machine, idx) => {
    const { target, mat } = machine;
    const res = cramers(mat, target);
    // console.log(idx, res);
    if (
      Math.abs(res.x > 100) ||
      Math.abs(res.y > 100) ||
      Math.abs(res.x - Math.floor(res.x)) > 0.01
    ) {
      // skip
    } else {
      console.log("good one", idx, res);

      // Hell yeah brother
      totalCost += res.x * 3 + res.y;
    }
  });

  return totalCost;
};

const partTwo = () => {
  let totalCost = 0;

  lines.forEach((machine, idx) => {
    const { target, mat } = machine;
    const res = cramers(mat, [
      target[0] + 10000000000000,
      target[1] + 10000000000000,
    ]);
    // console.log(idx, res);
    if (
      // Math.abs(res.x > 100) ||
      // Math.abs(res.y > 100) ||
      Math.abs(res.x - Math.floor(res.x)) > 0.01 ||
      Math.abs(res.y - Math.floor(res.y)) > 0.01
    ) {
      // skip
    } else {
      console.log("good one", idx, res);
      totalCost += res.x * 3 + res.y;
    }
  });

  return totalCost;
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");

// Yeah, really nice application of linear algebra
