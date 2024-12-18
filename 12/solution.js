import { data } from "./input.js";

const test = `AAAA
BBCD
BBCC
EEEC`;

const test2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const test3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const partOne = () => {
  const grid = data.split("\n").map((line) => line.split(""));
  console.log(grid);

  const visited = new Set();

  const dfs = (x, y, grid, char, region) => {
    // console.log(x, y);
    if (x < 0 || y < 0) return { area: 0, region };
    if (x >= grid.length || y >= grid.length) return { area: 0, region };
    if (grid[y][x] !== char) return { area: 0, region };
    let area = 1;
    grid[y][x] = "#";
    if (region) region.add(`${x},${y}`);
    visited.add(`${x},${y}`);
    area += dfs(x + 1, y, grid, char, region).area;
    area += dfs(x - 1, y, grid, char, region).area;
    area += dfs(x, y + 1, grid, char, region).area;
    area += dfs(x, y - 1, grid, char, region).area;
    return { area, region };
  };

  let totalCost = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      //   if (grid[j][i] === "#") continue;
      if (visited.has(`${i},${j}`)) continue;
      const { area, region } = dfs(
        i,
        j,
        [...grid.map((l) => [...l])],
        grid[j][i],
        new Set()
      );
      //   const perimeter = dfs2(i, j, [...grid.map((l) => [...l])], grid[j][i]);

      let perim = 0;
      const char = grid[j][i];
      for (const pt of region) {
        const [x, y] = pt.split(",").map(Number);
        if (grid[y][x + 1] !== char) perim++;
        if (grid[y][x - 1] !== char) perim++;
        if (grid[y + 1]?.[x] !== char) perim++;
        if (grid[y - 1]?.[x] !== char) perim++;
      }

      totalCost += area * perim;

      //   console.log(area, region, grid[j][i], perim);
    }
  }

  //   return dfs(0, 0, grid, grid[0][0]);
  return totalCost;
};

// ============================================================================================================

const partTwo = () => {
  const grid = data.split("\n").map((line) => line.split(""));

  const regions = [];
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const seen = new Set();

  // Lol we already had this in dfs above, oh well, good practice
  function getRegion(key) {
    const visited = new Set();
    const [i, j] = key.split(",").map(Number);
    const tgt = grid[i][j];
    const queue = [key];
    // console.log("processing", i, j, tgt);
    let times = 0;
    while (queue.length) {
      times++;
      const node = queue.shift();
      if (visited.has(node)) continue;
      const [i, j] = node.split(",").map(Number);
      const val = grid[i][j];
      //   console.log(node, i, j, val);

      if (val !== tgt) {
        continue;
      }

      visited.add(node);
      seen.add(node);

      const neighbors = dirs.map((dir) => [i + dir[0], j + dir[1]]);

      neighbors.forEach((n) => {
        if (
          n[0] >= 0 &&
          n[0] < grid.length &&
          n[1] >= 0 &&
          n[1] < grid[0].length
        ) {
          queue.push(n.join(","));
        }
      });
    }

    // console.log("processed", tgt, visited);

    return { tgt, visited };
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const key = `${i},${j}`;
      if (seen.has(key)) continue;
      const { visited } = getRegion(key);
      //   console.log(key, visited);
      // Process this region
      regions.push(visited);
    }
  }

  function getPerimeter(region) {
    let numCorners = 0;

    [...region].forEach((pt) => {
      const [i, j] = pt.split(",").map(Number);
      const char = grid[i][j];
      const north = grid[i - 1]?.[j];
      const south = grid[i + 1]?.[j];
      const east = grid[i][j + 1];
      const west = grid[i][j - 1];
      const northeast = grid[i - 1]?.[j + 1];
      const northwest = grid[i - 1]?.[j - 1];
      const southeast = grid[i + 1]?.[j + 1];
      const southwest = grid[i + 1]?.[j - 1];
      // console.log(char, pt, north, east, south, west);

      // Check for convex corners:
      if (north !== char && east !== char) numCorners++;
      if (south !== char && east !== char) numCorners++;
      if (north !== char && west !== char) numCorners++;
      if (south !== char && west !== char) numCorners++;

      // Check for concave corners:
      if (north === char && east === char && northeast !== char) numCorners++;
      if (north === char && west === char && northwest !== char) numCorners++;
      if (south === char && east === char && southeast !== char) numCorners++;
      if (south === char && west === char && southwest !== char) numCorners++;
    });

    console.log(numCorners);

    return numCorners;
  }

  return regions.reduce((sum, r) => sum + r.size * getPerimeter(r), 0);
};

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
