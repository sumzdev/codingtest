// https://www.acmicpc.net/problem/2667
// 단지 번호 붙이기
// 실버 1

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const inputString = fs.readFileSync(filePath).toString();

const input = inputString.trim().split("\n");
const N = +input[0];
const map = [];
for (let i = 1; i <= N; i++) {
  map.push(input[i].split("").map(Number));
}

const visited = Array.from({ length: N }).map((_) => Array(N + 1).fill(false));
const numOfHousesList = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    if (!map[i][j]) {
      visited[i][j] = true;
      continue;
    }

    const result = countHouse(i, j);
    if (result) numOfHousesList.push(result);
  }
}
console.log(numOfHousesList.length);
console.log(numOfHousesList.sort((a, b) => a - b).join("\n"));

function countHouse(rowIdxToStart, columnIdxToStart) {
  let numOfHouses = 0;
  let verticesToVisit = [[rowIdxToStart, columnIdxToStart]]; // queue
  let curRowIdx = 0;
  let curColumnIdx = 0;

  // dfsLoop
  while (verticesToVisit.length > 0) {
    [[curRowIdx, curColumnIdx], ...verticesToVisit] = verticesToVisit;

    if (visited[curRowIdx][curColumnIdx]) continue;
    if (!map[curRowIdx][curColumnIdx]) continue;

    visited[curRowIdx][curColumnIdx] = true;
    numOfHouses += 1;

    const verticesToAdd = [];

    if (curRowIdx + 1 < N) verticesToAdd.push([curRowIdx + 1, curColumnIdx]);
    if (curRowIdx - 1 >= 0) verticesToAdd.push([curRowIdx - 1, curColumnIdx]);
    if (curColumnIdx + 1 < N) verticesToAdd.push([curRowIdx, curColumnIdx + 1]);
    if (curColumnIdx - 1 >= 0)
      verticesToAdd.push([curRowIdx, curColumnIdx - 1]);

    verticesToVisit = [...verticesToAdd, ...verticesToVisit];
  }

  return numOfHouses;
}
