// https://www.acmicpc.net/problem/4963
// 섬의 개수
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();

const input = inputString.trim().split("\n");
let inputIdx = 0;

while (inputIdx < input.length - 1) {
  let [width, height] = input[inputIdx++].split(" ").map(Number);

  const map = Array.from({ length: height }).map((_) =>
    input[inputIdx++].split(" ").map(Number)
  );
  // console.log(map);

  console.log(countNumOfIslands({ width, height, map }));
}

function countNumOfIslands({ width, height, map }) {
  let countIslands = 0;
  const visited = Array.from({ length: height }).map((_) =>
    Array(width).fill(false)
  );

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (visited[i][j]) continue;
      if (!map[i][j]) {
        visited[i][j] = true;
        continue;
      }

      dfs(i, j);
      countIslands += 1;
    }
  }

  function dfs(rowIdxToStart, columnIdxToStart) {
    // let _countIslands = 0;
    let verticesToVisit = [[rowIdxToStart, columnIdxToStart]]; // queue
    let curRowIdx = 0;
    let curColumnIdx = 0;

    // dfsLoop
    while (verticesToVisit.length > 0) {
      [[curRowIdx, curColumnIdx], ...verticesToVisit] = verticesToVisit;

      if (visited[curRowIdx][curColumnIdx]) continue;
      if (!map[curRowIdx][curColumnIdx]) continue;

      visited[curRowIdx][curColumnIdx] = true;
      // _countIslands += 1;

      verticesToVisit = [
        ...createMovablePoints(curRowIdx, curColumnIdx, height, width),
        ...verticesToVisit,
      ];
    }
    // console.log("섬크기", _countIslands);
  }

  return countIslands;
}

function createMovablePoints(i, j, h, w) {
  const MOVE_POINTS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return MOVE_POINTS.map(([mi, mj]) => [i + mi, j + mj]).filter(
    ([i, j]) => i >= 0 && i < h && j >= 0 && j < w
  );
}
