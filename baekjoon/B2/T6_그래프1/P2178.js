// https://www.acmicpc.net/problem/2178
// 미로 탐색
// 실버 1

const NOT_VISIT = 0;

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
const input = inputString.trim().split("\n");

const [height, width] = input[0].split(" ").map(Number);
const maze = Array(height)
  .fill([])
  .map((_, i) => input[i + 1].split("").map(Number));
// console.log({ height, width, map: maze });

findShortestWay({ height, width, map: maze });

function findShortestWay({ width, height, map }) {
  const check = Array.from({ length: height }).map((_) =>
    Array(width).fill(NOT_VISIT)
  );

  let curI = 0;
  let curJ = 0;
  let verticesToVisit = [[curI, curJ]]; // queue

  while (verticesToVisit.length > 0) {
    [[curI, curJ], ...verticesToVisit] = verticesToVisit;

    if (check[curI][curJ] !== NOT_VISIT) continue;
    if (!map[curI][curJ]) continue;

    const points = createMovablePoints(curI, curJ, height, width);
    const values = points
      .filter(([i, j]) => map[i][j] === 1)
      .map(([i, j]) => check[i][j])
      .filter((v) => v !== NOT_VISIT);
    const min = values.length === 0 ? 0 : Math.min(...values);

    check[curI][curJ] = min + 1;
    verticesToVisit = [...verticesToVisit, ...points];

    // check.forEach((v) => console.log(v.join(" ")));
    // console.log();
  }

  console.log(check[height - 1][width - 1]);
}

function createMovablePoints(i, j, h, w) {
  const MOVE_POINTS = [
    // [-1, -1],
    [-1, 0],
    // [-1, 1],
    [0, -1],
    [0, 1],
    // [1, -1],
    [1, 0],
    // [1, 1],
  ];

  return MOVE_POINTS.map(([mi, mj]) => [i + mi, j + mj]).filter(
    ([i, j]) => i >= 0 && i < h && j >= 0 && j < w
  );
}
