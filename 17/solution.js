import { data } from "./input.js";

const test = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const partOne = () => {
  let [regs, prog] = data.split("\n\n");
  regs = regs
    .split("\n")
    .map((x) => x.match(/\d+/g))
    .map(Number);
  prog = prog.split(": ")[1].split(",").map(Number);

  let ptr = 0;

  const output = [];

  const instructions = {
    0: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      //   regs[0] /= div;
      regs[0] = Math.floor(regs[0] / div);
    },
    1: (lit) => {
      regs[1] = regs[1] ^ lit;
    },
    2: (combo) => {
      regs[1] = combo % 8;
    },
    3: (lit) => {
      if (regs[0] === 0) return;
      return lit;
    },
    4: () => {
      regs[1] = regs[1] ^ regs[2];
    },
    5: (combo) => {
      output.push(combo % 8);
    },
    6: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      regs[1] = Math.floor(regs[0] / div);
    },
    7: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      regs[2] = Math.floor(regs[0] / div);
    },
  };

  let times = 0;

  while (prog.length > 0) {
    // Oh right duh we can't shift off instructions since we can jump around...
    // const inst = prog.shift();
    // const operand = prog.shift();

    times++;

    const inst = prog[ptr];
    const operand = prog[ptr + 1];

    if (isNaN(inst)) break;

    // console.log("inst", inst, "operand", operand, "ptr", ptr);

    let op = parseInt(operand);

    if (![1, 3].includes(parseInt(inst))) {
      // need "combo" operand
      const idx = [4, 5, 6].indexOf(operand);
      if (idx > -1) {
        op = regs[idx];
      }
    }

    // console.log("op", op);

    const fn = instructions[inst];
    const jmp = fn(op);
    if (!isNaN(jmp)) {
      ptr = jmp;
    } else {
      ptr += 2;
    }

    // console.log("regs", regs);
  }

  //   return { regs, prog };
  return output.join(",");
};

const test2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

function runProgram(regs, prog) {
  let ptr = 0;

  const output = [];

  const instructions = {
    0: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      //   regs[0] /= div;
      regs[0] = Math.floor(regs[0] / div);
    },
    1: (lit) => {
      regs[1] = regs[1] ^ lit;
    },
    2: (combo) => {
      regs[1] = combo % 8;
    },
    3: (lit) => {
      if (regs[0] === 0) return;
      return lit;
    },
    4: () => {
      regs[1] = regs[1] ^ regs[2];
    },
    5: (combo) => {
      output.push(combo % 8);
    },
    6: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      regs[1] = Math.floor(regs[0] / div);
    },
    7: (combo) => {
      const div = Math.pow(2, combo);
      //   const val = regs[0] / div;
      regs[2] = Math.floor(regs[0] / div);
    },
  };

  while (prog.length > 0) {
    const inst = prog[ptr];
    const operand = prog[ptr + 1];

    if (isNaN(inst)) break;

    let op = parseInt(operand);

    if (![1, 3].includes(parseInt(inst))) {
      // need "combo" operand
      const idx = [4, 5, 6].indexOf(operand);
      if (idx > -1) {
        op = regs[idx];
      }
    }

    const fn = instructions[inst];
    const jmp = fn(op);
    if (!isNaN(jmp)) {
      ptr = jmp;
    } else {
      ptr += 2;
    }
  }

  return output.join(",");
}

const partTwo = () => {
  let initialA = 0;
  let [regs, prog] = data.split("\n\n");
  regs = regs
    .split("\n")
    .map((x) => x.match(/\d+/g))
    .map(Number);
  prog = prog.split(": ")[1].split(",").map(Number);
  const progStr = prog.join(",");

  //   return prog.length;

  while (true) {
    const regsCopy = [initialA, ...regs.slice(1)];
    const progCopy = [...prog];

    // if (initialA % 100_000 === 0) console.log("initA", initialA);

    const output = runProgram(regsCopy, progCopy);

    if (output === progStr) {
      break;
    }

    if (output.slice(0, 12) === progStr.slice(0, 12)) {
      console.log("val", initialA);
    }

    initialA++;
  }

  return initialA;

  //   return runProgram(regsCopy, progCopy);
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
