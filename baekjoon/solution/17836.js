// https://www.acmicpc.net/problem/17836
// 공주님을 구해라!
// 골드 5
// BFS
// 231118
// ---------------------------------------
// test case
// 6 6 20
// 0 1 1 1 1 2
// 0 0 1 1 1 0
// 0 0 0 0 1 0
// 0 1 1 0 1 0
// 0 0 0 0 0 0
// 0 0 2 0 1 0
// ---------------------------------------
function bfs(rowSize, colSize, limitTime, table) {
  // console.log(rowSize, colSize, limitTime, table);

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const checkRange = [
    (i, j) => i >= 0,
    (i, j) => i < rowSize,
    (i, j) => j >= 0,
    (i, j) => j < colSize,
  ];

  const checked = Array.from({ length: rowSize }, () =>
    Array(colSize).fill(-1)
  );

  const checkLimit = (time) => {
    return time > limitTime || time === -1 ? "Fail" : time;
  };

  const getMinTime = (time) => {
    return checked[rowSize - 1][colSize - 1] === -1
      ? time
      : Math.min(checked[rowSize - 1][colSize - 1], time);
  };

  let pointsToVisit = [[0, 0]];
  let time = 1;
  checked[0][0] = 0;

  while (pointsToVisit.length) {
    const nextPointsToVisit = [];

    for (const [i, j] of pointsToVisit) {
      if (table[i][j] === 2) {
        checked[rowSize - 1][colSize - 1] = getMinTime(
          checked[i][j] + (rowSize - i - 1) + colSize - j - 1
        );
        continue;
      }

      // ---- 다음 같은 depth의 방문할 노드들 추가 -------
      for (let direction = 0; direction < 4; direction += 1) {
        const [ni, nj] = [i + dx[direction], j + dy[direction]];

        if (ni === rowSize - 1 && nj === colSize - 1) {
          checked[i][j] = getMinTime(time);
          return checkLimit(checked[i][j]);
        }

        if (
          checkRange[direction](ni, nj) &&
          table[ni][nj] !== 1 &&
          checked[ni][nj] === -1
        ) {
          nextPointsToVisit.push([ni, nj]);
          checked[ni][nj] = time;
        }
      }
    }

    pointsToVisit = nextPointsToVisit;
    // console.log(nextPointsToVisit);
    // console.log(checked);

    time += 1;
    if (time > limitTime) break;
  }

  return checkLimit(checked[rowSize - 1][colSize - 1]);
}

// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
      "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [size, ...inputLine] = input.toString().trim().split("\n");
  const [rowSize, colSize, limitTime] = size.split(" ").map(Number);

  console.log(
    bfs(
      rowSize,
      colSize,
      limitTime,
      inputLine.map((v) => v.split(" ").map(Number))
    )
  );
}
