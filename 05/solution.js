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

const partTwo = () => {
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

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const applyingRules = rules.filter((r) =>
      r.every((x) => candidate.includes(x))
    );

    // console.log(i, applyingRules.length);

    // Skip valid candidates:
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
      console.log(i, "is valid");
      continue;
    }

    // Seems like we want to topological sort
    // So... initial nodes are ones with no dependencies (that don't have to come AFTER anyone else)
    // Every time you process a node, you remove it, and decrement the number of dependencies for everyone who must come after it
    // So each node needs: (1) the number of nodes that IT must come after, and (2) a list of the nodes that must come after IT.
    // if (valid) {
    //   //   total++;
    //   total += candidate[Math.floor(candidate.length / 2)];
    // } else {
    //   console.log(i, invalid.length);
    // }

    const map = {};
    applyingRules.forEach((r) => {
      const [s, e] = r;
      if (!map[s]) map[s] = { src: 0, dep: [] };
      if (!map[e]) map[e] = { src: 0, dep: [] };
      map[s].dep.push(e);
      map[e].src++;
    });

    const queue = [];
    const res = [];
    for (const key of Object.keys(map)) {
      if (map[key].src === 0) {
        queue.push(key);
      }
    }
    while (queue.length > 0) {
      const node = queue.shift();
      res.push(node);
      map[node].dep.forEach((n) => {
        map[n].src--;
        if (map[n].src === 0) {
          queue.push(n);
        }
      });
    }

    // console.log("res for", i, res);

    total += res[Math.floor(res.length / 2)];
  }

  return total;
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
