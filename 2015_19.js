// Oh wow a tough BFS one.

// We have to start with base molecule, and find minimum number of steps to reach target molecule.
// We are given a list of valid transformations, and we can apply them to the molecule (replacements).

// So we have a queue....always pick one with minimum distance...
// Each node is just a string, and the number of steps...

// Then for each node, we need to, for each rule, see if we can apply it.
// And then perform the replacement(s) if possible, add to queue.

const rulesText = `Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg`;

const testRulesText = `e => H
e => O
H => HO
H => OH
O => HH`;

const rules = rulesText.split("\n").map((x) => x.split(" => "));
const molecule = "e";
let target =
  "CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl";

// target = "HOHOHO";

// Works on test.... pretty slow though on real thing...
// I guess we're processing duplicates huh...
// Yeah I'm thinking this isn't gonna work hahaha

// "That problem constitutes a context free grammar. You can generically solve it by implementing the CYK algorithm."

const run = () => {
  const queue = [];
  const seen = new Set();
  const node = { molecule, steps: 0 };
  queue.push(node);
  while (queue.length > 0) {
    const current = queue.shift();
    if (seen.has(current.molecule)) continue;
    seen.add(current.molecule);
    if (current.molecule === target) return current.steps;
    for (const [from, to] of rules) {
      let index = current.molecule.indexOf(from);
      // Clever way to find all occurrences...nice
      while (index !== -1) {
        const newMolecule =
          current.molecule.slice(0, index) +
          to +
          current.molecule.slice(index + from.length);
        queue.push({ molecule: newMolecule, steps: current.steps + 1 });
        index = current.molecule.indexOf(from, index + 1);
      }
    }
  }
};

console.time("run");
console.log(run());
console.timeEnd("run");
