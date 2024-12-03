import { mkdirSync, writeFileSync } from "fs";

const run = () => {
  for (let i = 0; i < 25; i++) {
    let x = i + 1;
    x = x.toString();
    if (x.length === 1) {
      x = "0" + x;
    }

    const input = `
    export const data = "";
    `;

    const solution = `
    import { data } from "./input.js";

    const partOne = () => {};

    const partTwo = () => {};

    console.time("solution");
    console.log("Result: ", partOne());
    console.timeEnd("solution");

        `;

    const dir = `./${x}`;
    mkdirSync(dir);
    writeFileSync(`${dir}/input.js`, input);
    writeFileSync(`${dir}/solution.js`, solution);
  }
};

run();
