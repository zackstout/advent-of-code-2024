import { data } from "./input.js";

const test = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const test2 = `p=2,4 v=2,-3`;

const lines = data.split("\n").map((l) => {
  let [p, v] = l.split(" ");
  p = p.split("=")[1].split(",").map(Number);
  v = v.split("=")[1].split(",").map(Number);
  return { p, v };
});
const bounds = { x: 101, y: 103 };
const mid = { x: Math.floor(bounds.x / 2), y: Math.floor(bounds.y / 2) };

const render = (particles) => {
  const grid = [];
  for (let i = 0; i < bounds.y; i++) {
    const row = [];
    for (let j = 0; j < bounds.x; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  // console.log(grid);
  particles.forEach((p) => {
    const x = p.p[0];
    const y = p.p[1];
    // console.log(x, y);
    grid[y][x] += 1;
  });

  console.log("==============");
  console.log(grid.map((l) => l.join("")).join("\n"));
};

const partOne = () => {
  //   return lines.slice(0, 5);

  const particles = lines.slice(0);

  let times = 0;

  render(particles);

  while (times < 100) {
    particles.forEach((p) => {
      //   console.log("vel", p.v, [...p.p]);
      p.p[0] += p.v[0];
      // This was mistake.... have to add the amount that you mod out by... obviously lol....
      p.p[0] += bounds.x;
      p.p[0] %= bounds.x;
      p.p[1] += p.v[1];
      p.p[1] += bounds.y;
      p.p[1] %= bounds.y;

      //   console.log("after", [...p.p]);
    });

    console.clear();
    render(particles);

    times++;
  }

  console.log(bounds, mid);

  const q1 = particles.filter((p) => p.p[0] < mid.x && p.p[1] > mid.y);
  const q2 = particles.filter((p) => p.p[0] > mid.x && p.p[1] > mid.y);
  const q3 = particles.filter((p) => p.p[0] < mid.x && p.p[1] < mid.y);
  const q4 = particles.filter((p) => p.p[0] > mid.x && p.p[1] < mid.y);
  //   console.log(particles.length, "q1", q1, "q2", q2, "q3", q3, "q4", q4);

  return q1.length * q2.length * q3.length * q4.length;
  return lines;
};

const partTwo = () => {
  const particles = lines.slice(0);

  let times = 0;

  //   render(particles);

  while (times < 1_000_000) {
    particles.forEach((p) => {
      //   console.log("vel", p.v, [...p.p]);
      p.p[0] += p.v[0];
      // This was mistake.... have to add the amount that you mod out by... obviously lol....
      p.p[0] += bounds.x;
      p.p[0] %= bounds.x;
      p.p[1] += p.v[1];
      p.p[1] += bounds.y;
      p.p[1] %= bounds.y;

      //   console.log("after", [...p.p]);
    });

    const xFreqs = {};
    const yFreqs = {};

    particles.forEach((p) => {
      if (!xFreqs[p.p[0]]) xFreqs[p.p[0]] = 0;
      xFreqs[p.p[0]]++;

      if (!yFreqs[p.p[1]]) yFreqs[p.p[1]] = 0;
      yFreqs[p.p[1]]++;
    });

    if (
      Object.values(xFreqs).some((v) => v > 25) &&
      Object.values(yFreqs).some((v) => v > 25)
    ) {
      console.log("All done", times + 1);
      render(particles);
      break;
    }

    // const xs = new Set(particles.map((p) => p.p[0]));
    // const ys = new Set(particles.map((p) => p.p[1]));
    // if (xs.size < 70 || ys.size < 70) {
    //   console.log("All done", times);
    //   break;
    // }

    if (times % 1000 === 0) {
      console.log("Time", times);
    }

    // console.clear();
    // render(particles);

    times++;
  }
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
