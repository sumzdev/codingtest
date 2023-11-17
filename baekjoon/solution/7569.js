// https://www.acmicpc.net/problem/7569
// 토마토 (3차원)
// 골드 5
// DFS
// 231117
// ---------------------------------------
function findTableDistance(fSize, rowSize, colSize, table) {
  const df = [0, 0, 0, 0, -1, 1];
  const dx = [-1, 1, 0, 0, 0, 0];
  const dy = [0, 0, -1, 1, 0, 0];

  const checkRange = [
    (f, i, j) => i >= 0,
    (f, i, j) => i < rowSize,
    (f, i, j) => j >= 0,
    (f, i, j) => j < colSize,
    (f, i, j) => f >= 0,
    (f, i, j) => f < fSize,
  ];

  const distanceTable = Array.from({ length: fSize }, () =>
    Array.from({ length: rowSize }, () => Array(colSize).fill(0))
  );

  let pointsToVisit = [];

  // 모두 익음 : 1과 -1만 있음 => 1
  // 익은 토마토가 없음 : 1이 없음 => -1

  let cntEmpty = 0;
  let cntFinish = 0;

  // init
  (() => {
    for (let f = 0; f < fSize; f += 1) {
      for (let i = 0; i < rowSize; i += 1) {
        for (let j = 0; j < colSize; j += 1) {
          // --- 주어진 조건에 따라 초기 테이블 값 설정 -----
          if (table[f][i][j] === 1) {
            pointsToVisit.push([f, i, j]);
          } else if (table[f][i][j] === -1) {
            distanceTable[f][i][j] = -1;
            cntEmpty += 1;
          } else {
            cntFinish += 1;
          }
          // ---------------------------------------
        }
      }
    }
  })();
  // console.log(distanceTable.join("\n"));

  let distance = 0;

  if (!pointsToVisit.length) return -1;
  else if (cntFinish + cntEmpty === fSize * rowSize * colSize) return 0;

  while (pointsToVisit.length) {
    const nextPointsToVisit = [];
    distance += 1;

    // console.log(pointsToVisit, distance);

    for (const [f, i, j] of pointsToVisit) {
      // ----(1)주어진 조건에 따라 visited 여부 판단 -------
      if (distanceTable[f][i][j] !== 0) continue;

      // ----주어진 조건에 따라 테이블 값 설정 -----------
      distanceTable[f][i][j] = distance;

      // ---- 다음 같은 depth의 방문할 노드들 추가 -------
      for (let direction = 0; direction < 6; direction += 1) {
        const [nf, ni, nj] = [
          f + df[direction],
          i + dx[direction],
          j + dy[direction],
        ];

        if (
          checkRange[direction](nf, ni, nj) &&
          // ---- 주어진 조건에 따라 visited 여부에 따라 추가하지 않기
          distanceTable[nf][ni][nj] === 0
        ) {
          nextPointsToVisit.push([nf, ni, nj]);
        }
      }
    }

    // reverse() 안해도 별로 차이는 없음
    pointsToVisit = nextPointsToVisit.reverse();
  }

  // console.log(distanceTable, distance);
  let numOfDays = 0;

  for (let f = 0; f < fSize; f += 1) {
    for (let i = 0; i < rowSize; i += 1) {
      for (let j = 0; j < colSize; j += 1) {
        if (distanceTable[f][i][j] === 0) return -1;
        numOfDays = Math.max(numOfDays, distanceTable[f][i][j]);
      }
    }
  }

  return numOfDays - 1;
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
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [size, ...inputLine] = input.toString().trim().split("\n");
  const [colSize, rowSize, fSize] = size.split(" ").map(Number);

  let idx = 0;
  const table = [];
  for (let f = 0; f < fSize; f += 1) {
    const pane = [];
    for (let r = 0; r < rowSize; r += 1) {
      pane.push(inputLine[idx++].split(" ").map(Number));
    }
    table.push(pane);
  }

  console.log(findTableDistance(fSize, rowSize, colSize, table));
}
