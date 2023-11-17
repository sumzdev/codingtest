// https://www.acmicpc.net/problem/14940
// 쉬운 최단거리
// 실버1
// BFS
// 231117
// // ---------------------------------------
function findTableDistance(rowSize, colSize, table) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const checkRange = [
    (i, j) => i >= 0,
    (i, j) => i < rowSize,
    (i, j) => j >= 0,
    (i, j) => j < colSize,
  ];

  const distanceTable = Array.from({ length: rowSize }, () =>
    Array(colSize).fill(-1)
  );

  let pointsToVisit = [];

  // init
  (() => {
    for (let i = 0; i < rowSize; i += 1) {
      for (let j = 0; j < colSize; j += 1) {
        if (table[i][j] === 2) {
          pointsToVisit = [[i, j]];
        } else if (table[i][j] === 0) {
          distanceTable[i][j] = 0;
        }
      }
    }
  })();

  let distance = 0;

  while (pointsToVisit.length) {
    const nextPointsToVisit = [];

    for (const [i, j] of pointsToVisit) {
      if (distanceTable[i][j] !== -1) continue;
      distanceTable[i][j] = distance;

      for (let direction = 0; direction < 4; direction += 1) {
        if (checkRange[direction](i + dx[direction], j + dy[direction])) {
          nextPointsToVisit.push([i + dx[direction], j + dy[direction]]);
        }
      }
    }

    distance += 1;
    pointsToVisit = nextPointsToVisit.reverse();
  }

  return distanceTable
    .map((row) => row.join(" "))
    .join("\n")
    .trim();
}

// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [size, ...inputLine] = input.toString().trim().split("\n");
  const [rowSize, colSize] = size.split(" ").map(Number);

  console.log(
    findTableDistance(
      rowSize,
      colSize,
      inputLine.map((v) => v.split(" ").map(Number))
    )
  );
}
