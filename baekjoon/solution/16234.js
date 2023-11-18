// https://www.acmicpc.net/problem/16234
// 인구 이동
// 골드 4
// BFS
// 231118
// ---------------------------------------
function findTableDistance(tableSize, openLimit, closeLimit, table) {
  // console.log(tableSize, openLimit, closeLimit, table);
  // console.log(table.map((v) => v.join("\t")).join("\n") + "\n");

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const checkRange = [
    (i, j) => i >= 0,
    (i, j) => i < tableSize,
    (i, j) => j >= 0,
    (i, j) => j < tableSize,
  ];

  const distanceTable = table.map((v) => [...v]);

  let cntMove = 0;

  while (true) {
    const cntUnion = [1];
    const sumUnion = [1];

    // -1: 방문함(연합에 포함되지 않음) / 0: 방문 안함 / 1 이상: (i)연합에 포함됨
    const checkList = Array.from({ length: tableSize }, () =>
      Array(tableSize).fill(0)
    );

    let unionIdx = 1;

    for (let i = 0; i < tableSize; i += 1) {
      for (let j = 0; j < tableSize; j += 1) {
        // console.log(">>>>", i, j, "---", unionIdx);
        if (!checkList[i][j]) {
          checkList[i][j] = unionIdx;

          let unionPoints = [];
          let pointsToVisit = [[i, j]];

          let sum = 0;
          let cnt = 0;

          while (pointsToVisit.length) {
            const nextPointsToVisit = [];

            for (const [ci, cj] of pointsToVisit) {
              // console.log(">", ci, cj);

              for (let direction = 0; direction < 4; direction += 1) {
                const [ni, nj] = [ci + dx[direction], cj + dy[direction]];
                if (!checkRange[direction](ni, nj)) continue;
                if (checkList[ni][nj] > 0) continue;

                const diff = Math.abs(
                  distanceTable[ci][cj] - distanceTable[ni][nj]
                );
                // console.log("cur", ci, cj, "d", ni, nj, "diff", diff);

                if (
                  diff >= openLimit &&
                  diff <= closeLimit &&
                  checkList[ni][nj] <= 0
                ) {
                  sum += distanceTable[ni][nj];
                  cnt += 1;
                  nextPointsToVisit.push([ni, nj]);
                  checkList[ni][nj] = unionIdx;
                }
              }
            }
            pointsToVisit = nextPointsToVisit;
          }

          if (!cnt) {
            checkList[i][j] = -1;
          } else {
            unionIdx += 1;
            sumUnion.push(sum + distanceTable[i][j]);
            cntUnion.push(cnt + 1);
          }

          // console.log("checklist", checkList);
        }
      }
    }

    if (cntUnion.length === 1) return cntMove;
    cntMove += 1;
    // console.log("###", cntMove, checkList, cntUnion, sumUnion);

    const nextPopulation = sumUnion.map((v, i) => Math.floor(v / cntUnion[i]));

    for (let i = 0; i < tableSize; i += 1) {
      for (let j = 0; j < tableSize; j += 1) {
        if (checkList[i][j] > 0) {
          distanceTable[i][j] = nextPopulation[checkList[i][j]];
        }
      }
    }
    // console.log(checkList.map((v) => v.join("\t")).join("\n") + "\n");
    // console.log(distanceTable.map((v) => v.join("\t")).join("\n") + "\n");
  }
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
      "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [size, ...inputLine] = input.toString().trim().split("\n");
  const [tableSize, openLimit, closeLimit] = size.split(" ").map(Number);

  console.log(
    findTableDistance(
      tableSize,
      openLimit,
      closeLimit,
      inputLine.map((v) => v.split(" ").map(Number))
    )
  );
}
