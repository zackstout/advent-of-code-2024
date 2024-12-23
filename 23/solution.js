import { data } from "./input.js";

const ex = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const partOne = () => {
  const singles = new Set();
  const lines = data.split("\n").map((l) => l.trim());
  const m = new Map();
  lines.forEach((line) => {
    const [x, y] = line.split("-");
    if (!m.has(x)) m.set(x, []);
    if (!m.has(y)) m.set(y, []);
    m.get(x).push(y);
    m.get(y).push(x);
    singles.add(x);
    singles.add(y);
  });

  const arr = [...singles];

  //   console.log(arr);

  //   const res = [];

  const res = new Set();

  for (let i = 0; i < arr.length; i++) {
    const first = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const second = arr[j];
      if (!m.get(first).includes(second)) continue;
      for (let k = j + 1; k < arr.length; k++) {
        if (!m.get(first).includes(arr[k])) continue;
        if (!m.get(second).includes(arr[k])) continue;

        // ahh, startsWith, not includes
        if (
          !first.startsWith("t") &&
          !second.startsWith("t") &&
          !arr[k].startsWith("t")
        ) {
          continue;
        }
        // res.push([first, second, arr[k]]);
        res.add([first, second, arr[k]].sort().join("-"));
      }
    }
  }

  return res.size;

  //   return 520 * 519 * 518;
  //   return singles.size;
};

// Find all complete subgraphs of the graph -- known as the "clique problem".
const partTwo = () => {
  const singles = new Set();
  const lines = data.split("\n").map((l) => l.trim());
  const m = new Map();
  lines.forEach((line) => {
    const [x, y] = line.split("-");
    if (!m.has(x)) m.set(x, []);
    if (!m.has(y)) m.set(y, []);
    m.get(x).push(y);
    m.get(y).push(x);
    singles.add(x);
    singles.add(y);
  });

  let maxSize = 0;
  let maxClique = "";

  const union = (s, t) => {
    return new Set([...s, ...t]);
  };

  const intersects = (s, t) => {
    const intersectionSet = new Set([...s].filter((x) => t.has(x)));
    return intersectionSet;
  };

  const bronKerbosch = (r, p, x) => {
    if (p.size === 0 && x.size === 0) {
      //   console.log("maximal clique found", r);
      if (r.size > maxSize) {
        maxSize = r.size;
        maxClique = [...r].sort().join(",");
      }
      return;
    }

    for (const pt of [...p]) {
      const nbrs = new Set(m.get(pt));

      // Oooooh funny you can't do new Set(str) because it splits it on characters.... interesting!
      bronKerbosch(
        union(r, new Set().add(pt)),
        intersects(p, nbrs),
        intersects(x, nbrs)
      );

      // Recursive backtracking:
      p.delete(pt);
      x.add(pt);
    }
  };

  bronKerbosch(new Set(), singles, new Set());

  return { maxSize, maxClique };
};

// 2341 is too high...
console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
