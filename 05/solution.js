import { data } from "./input.js";

const test = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const partOne = () => {
  const rules = data
    .split("\n\n")[0]
    .split("\n")
    .map((l) => l.split("|").map((n) => +n));
  const candidates = data
    .split("\n\n")[1]
    .split("\n")
    .map((l) => l.split(","))
    .map((l) => l.map((n) => +n));

  let total = 0;

  for (const candidate of candidates) {
    let valid = true;
    for (const rule of rules) {
      if (rule.every((n, i) => candidate.includes(n))) {
        const i1 = candidate.indexOf(rule[0]);
        const i2 = candidate.indexOf(rule[1]);
        // console.log("checking", candidate, rule, i1, i2);

        if (i1 > i2) {
          valid = false;
          break;
        }
      }
    }
    if (valid) {
      //   total++;
      total += candidate[Math.floor(candidate.length / 2)];
    }
  }

  return total;
};

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
