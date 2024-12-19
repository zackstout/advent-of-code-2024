import { data } from "./input.js";

// Seems like good candidate for DP, similar to coin change problem.
// Given a list of available towel pieces, and a list of target towels to make...

// For instance, to know if we can make "bwurrg"...
// We look at b + wurrg, and bw + urrg, and bwu + rrg, etc...
// Ask if we have the first one, and if so, then problem reduces can we make the second one.

const ex = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const cache = {};

function canMake(target, ingrds, maxLen) {
  // Ahhh this was it I think.. yeah we have to check for undefined lol oops
  if (cache[target] !== undefined) return cache[target];
  //   console.log("can make", target, maxLen, Object.keys(cache).length);
  //   console.log("can make", target, idx);
  if (target.length === 0) return true;
  if (ingrds.has(target)) return true;

  for (let i = 0; i < maxLen; i++) {
    // console.log(target.slice(0, i + 1), target.slice(i + 1));
    const start = target.slice(0, i + 1);
    const end = target.slice(i + 1);
    if (ingrds.has(start)) {
      if (canMake(end, ingrds, maxLen)) {
        cache[target] = true;
        return true;
      }
    }
  }
  cache[target] = false;
  return false;
}

const partOne = () => {
  let [ingredients, targets] = data.split("\n\n");
  ingredients = new Set(ingredients.split(", "));
  targets = targets.split("\n");

  console.log(targets.length, ingredients.size);

  const maxLen = Math.max(...[...ingredients].map((x) => x.length));

  //   return canMake(
  //     "gwrggbrugrrgbubrugwgwrbbwrggrgwwbbbrguubrbwbwwww",
  //     ingredients,
  //     maxLen
  //   );
  //   return canMake(
  //     "bwbbrrgrrbrggubuggwgguguburbbgbgrruggugbggggb",
  //     ingredients,
  //     maxLen
  //   );

  return targets.filter((tgt, idx) => {
    const res = canMake(tgt, ingredients, maxLen);
    console.log("filter", idx, res);
    return res;
  }).length;
  //   return canMake("bwurrg", ingredients);

  //   return canMake(targets[0], ingredients);

  return { ingredients, targets };
};

const partTwo = () => {
  // Gotta be DP, just gotta be.
  // Count "number of ways" feels so similar to coin change...

  //   const seen = {};

  const seen = new Map();

  let [ingredients, targets] = data.split("\n\n");
  ingredients = new Set(ingredients.split(", "));
  targets = targets.split("\n");

  //   ingredients.forEach((i) => (seen[i] = 1));

  const maxLen = Math.max(...[...ingredients].map((x) => x.length));

  function getNumWays(target) {
    // console.log("get num", target, maxLen);
    if (target === "") return 1;
    if (seen.has(target)) {
      return seen.get(target);
    }
    let count = 0;

    for (let i = 0; i < maxLen; i++) {
      // console.log(target.slice(0, i + 1), target.slice(i + 1));
      const start = target.slice(0, i + 1);
      const end = target.slice(i + 1);

      if (ingredients.has(start)) {
        const x = getNumWays(end);
        console.log("x", x, end);
        count += x;
      }
    }

    seen.set(target, count);
    // console.log("return", target, count);
    return count;
  }

  // Yup, this works
  function getNumWaysCorrect(target) {
    if (target === "") return 1;
    if (seen.has(target)) {
      return seen.get(target);
    }
    let count = 0;

    for (const ing of [...ingredients]) {
      if (ing <= target && target.startsWith(ing)) {
        count += getNumWaysCorrect(target.slice(ing.length));
      }
    }

    seen.set(target, count);
    // console.log("return", target, count);
    return count;
  }

  // wtf???? what is different here?????
  // Ah, the fact that he is iterating through ingredients.... rather than through "cut points" in the target....
  // huh...
  // i almost see it..

  //   function patternCount(design, memo) {
  //     if (design === "") return 1;
  //     if (memo.has(design)) {
  //       return memo.get(design);
  //     }
  //     let count = 0;
  //     for (const pattern of [...ingredients]) {
  //       if (pattern.length > design.length) continue;
  //       if (pattern[0] !== design[0]) continue;
  //       if (design.startsWith(pattern)) {
  //         const remaining = design.slice(pattern.length);
  //         count += patternCount(remaining, memo);
  //       }
  //     }
  //     memo.set(design, count);
  //     return count;
  //   }

  //   return getNumWays("gbbr");

  const seenMap = new Map();

  return targets.reduce((sum, tgt) => {
    const v = getNumWaysCorrect(tgt);
    // const v = patternCount(tgt, seenMap);
    console.log("v for tgt", v, tgt);
    return v + sum;
  }, 0);
};

// P1
// Ooooh i see.... for e.g. "br", we are returning that there is only 1 way to make that, because it's in ingredients...
// But it can also be "b" + "r"....

// P2
// Yep it's 712058625427487
console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
