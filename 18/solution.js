import { data } from "./input.js";

const ex = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

let isTest = false;

const limit = isTest ? 12 : 1024;
const size = isTest ? 6 : 70;

const partOne = () => {
  const take = (isTest ? ex : data).split("\n").slice(0, limit);
  const obstacles = new Set();
  for (const line of take) {
    // const [x,y]=line.split(",").map(Number);
    obstacles.add(line);
  }

  const start = { x: 0, y: 0 };
  const goal = { x: size, y: size };

  const visited = new Set();
  const queue = [{ ...start, distance: 0 }];

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let times = 0;

  while (true) {
    times++;
    const node = queue.shift();
    if (!node) {
      //   console.log("break", node, times);
      break;
    }
    const key = `${node.x},${node.y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    // console.log(node);
    // const [x, y] = node.split(",").map(Number);
    const { x, y, distance } = node;
    for (const dir of dirs) {
      const newPos = { x: x + dir[0], y: y + dir[1], distance: distance + 1 };
      const newKey = `${newPos.x},${newPos.y}`;
      //   visited.add(newKey);
      //   console.log("new", newKey);
      if (newPos.x === goal.x && newPos.y === goal.y) {
        return newPos.distance;
      }
      if (
        newPos.x >= 0 &&
        newPos.x <= size &&
        newPos.y >= 0 &&
        newPos.y <= size &&
        !obstacles.has(newKey)
      ) {
        queue.push(newPos);
      }
    }
  }

  return 0;
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
