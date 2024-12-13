const nums = `1
2
3
7
11
13
17
19
23
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113`
  .split("\n")
  .map((x) => parseInt(x, 10));

// Oh wow, it worked haha
// Just assumes that remaining packages can be divided evenly
const run = () => {
  const total = nums.reduce((a, b) => a + b, 0);

  // PART ONE
  //   const target = total / 3;

  // PART TWO -- the only change lol
  const target = total / 4;

  let subsetSize = 1;
  while (true) {
    const subsets = getSubsets(nums, subsetSize);
    const validSubsets = subsets.filter(
      (subset) => subset.reduce((a, b) => a + b, 0) === target
    );
    if (validSubsets.length > 0) {
      //   return validSubsets.map((subset) => subset.reduce((a, b) => a * b, 1));
      return validSubsets
        .sort(
          (a, b) => a.reduce((x, y) => x * y) - b.reduce((x, y) => x * y)
        )[0]
        .reduce((x, y) => x * y);
    }
    subsetSize++;
  }
};

function getSubsets(arr, size) {
  const results = [];
  const f = function (arr, size, start, current) {
    if (current.length === size) {
      results.push(current.slice());
    } else {
      for (let i = start; i < arr.length; i++) {
        current.push(arr[i]);
        f(arr, size, i + 1, current);
        current.pop();
      }
    }
  };
  f(arr, size, 0, []);
  return results;
}

console.log(run());

// console.log(getSubsets([1, 2, 3, 4], 2));
