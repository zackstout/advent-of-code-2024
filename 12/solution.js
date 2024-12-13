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

  //   const dfs2 = (x, y, grid, char) => {
  //     // console.log(x, y);
  //     if (x < 0 || y < 0) return 1;
  //     if (x >= grid.length || y >= grid.length) return 1;
  //     if (grid[y][x] !== char) return 1;
  //     let perim = 0;
  //     // grid[y][x] = "#";
  //     perim += dfs(x + 1, y, grid, char);
  //     perim += dfs(x - 1, y, grid, char);
  //     perim += dfs(x, y + 1, grid, char);
  //     perim += dfs(x, y - 1, grid, char);
  //     return perim;
  //   };

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

const partTwo = () => {};

console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
