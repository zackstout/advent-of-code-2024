import { data } from "./input.js";

// Wouldn't be ideal, but it seems like you could loop over rules list over and over,
// looking for any where both the values are cached.
// otherwise skip that rule.

const ex = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;

const partOne = (input) => {
  let [starts, rules] = input.split("\n\n");
  starts = starts.split("\n").map((x) => x.trim().split(": "));
  rules = rules.split("\n").map((l) => l.split(" -> "));

  const m = new Map();

  starts.forEach((s) => {
    m.set(s[0], parseInt(s[1]));
  });

  console.log("total rules", rules.length);

  let times = 0;

  while (rules.length > 0) {
    times++;
    const rule = rules.shift();
    // console.log("rule", rule, times);
    const [k1, op, k2] = rule[0].split(" ");
    const tgt = rule[1];
    const v1 = m.get(k1);
    const v2 = m.get(k2);
    if (v1 === undefined || v2 === undefined) {
      rules.push(rule);
      //   console.log("continuing");
      continue;
    }
    let val;
    switch (op) {
      case "XOR":
        // Whoops! parseInt doesn't work this way!
        // val = parseInt((v1 && !v2) || (v2 && !v1));
        val = (v1 && !v2) || (v2 && !v1) ? 1 : 0;
        m.set(tgt, val);
        break;
      case "OR":
        val = parseInt(v1 || v2);
        m.set(tgt, val);
        break;
      case "AND":
        val = parseInt(v1 && v2);
        m.set(tgt, val);
        break;
      default:
    }

    // If the rule can be processed it, don't add it back to queue.
  }

  let i = 0;
  let res = "";
  while (true) {
    while (i.toString().length < 2) {
      i = "0" + i;
    }
    const key = `z${i}`;
    console.log(key, m.get(key));
    if (m.get(key) === undefined) break;
    res += m.get(key);
    i++;
  }

  function reverse(str) {
    let res = "";
    for (let i = str.length - 1; i >= 0; i--) {
      res += str[i];
    }
    return res;
  }

  res = reverse(res);

  // Parse out of binary
  res = parseInt(res, 2);

  return { m, res };
};

const partTwo = (input) => {
  let [starts, rules] = input.split("\n\n");
  starts = starts.split("\n").map((x) => x.trim().split(": "));
  rules = rules.split("\n").map((l) => l.split(" -> "));

  const m = new Map();

  rules.forEach((r) => {
    //   if (!m.get(r[1])) m.set(r, []);
    const [in1, _, in2] = r[0].split(" ");
    const out = r[1];
    if (!m.get(in1)) m.set(in1, []);
    if (!m.get(in2)) m.set(in2, []);
    m.get(in1).push(out);
    m.get(in2).push(out);
  });

  return m;
};

console.time("solution");
console.log("Result: ", partTwo(ex));
console.timeEnd("solution");
