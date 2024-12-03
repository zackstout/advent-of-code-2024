const test = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const test2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))andhereisanotherdon't()attheend`;

import clipboard from "clipboardy";

const input = ``;

const partOne = async () => {
  const regex = new RegExp(/mul\((\d+),(\d+)\)/g);

  const str = await clipboard.read();

  //   console.log("str", str);
  const matches = str.match(regex);
  if (!matches) return;
  return matches.reduce((sum, val) => {
    const [a, b] = val.match(/\d+/g);
    // console.log(a, b);
    return sum + a * b;
  }, 0);
};

const partTwo = async () => {
  let str = await clipboard.read();
  //   str = test2;
  //   console.log("str", str);

  // Ahh nice, just check them all in a single expression!
  // Then we are guaranteed to get them in order... duh

  const regex = new RegExp(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g);
  //   const regex = new RegExp(/don't\(\)/g);
  //   const regex = new RegExp(/do\(\)/g);

  //   const matches = str.match(regex);

  let disabled = false;

  let match;
  let total = 0;

  // This is very useful pattern to be aware of...
  while ((match = regex.exec(str))) {
    // console.log("match", match);
    const val = match[0];
    if (val.includes("don't")) {
      disabled = true;
      continue;
    }
    if (val.includes("do")) {
      disabled = false;
      continue;
    }
    if (disabled) continue;
    // console.log("val", val);

    const [a, b] = val.match(/\d+/g);
    // console.log(a, b);
    total += a * b;
  }

  return total;
};

// Yeah we have to await it..
// But hell yeah, this works perfectly
// Great way to avoid having to actually store the input anywhere....
const x = await partTwo();
console.log("result", x);
