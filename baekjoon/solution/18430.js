// https://www.acmicpc.net/problem/18430
// 무기 공학
// 골드 4
// 백트래킹
// 231011

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

/**
 *
 * @param {number} N (1 <= N <= 5)
 * @param {number} M (1 <= M <= 5)
 * @param {number[][]} strengthList (1 <= K <= 100)
 */
function findMaxBoomerang(N, M, strengthList) {
  // console.log(N, M, strengthList);
  if (N === 1 || M === 1) return 0;

  const visited = Array.from({ length: N }).map((_) =>
    Array.from({ length: M }).map((v) => false)
  );

  let maxSum = 0;
  let sum = 0;

  const getShapesIndexList = (rowIdx, colIdx) => {
    // ⌜, ⌝, ⌞, ⌟
    return [
      [
        [rowIdx + 1, colIdx],
        [rowIdx, colIdx + 1],
      ],
      [
        [rowIdx, colIdx - 1],
        [rowIdx + 1, colIdx],
      ],
      [
        [rowIdx - 1, colIdx],
        [rowIdx, colIdx + 1],
      ],
      [
        [rowIdx - 1, colIdx],
        [rowIdx, colIdx - 1],
      ],
    ];
  };

  const backtracking = (rowIdx, colIdx) => {
    // console.log(rowIdx, colIdx);
    if (colIdx === M) {
      colIdx = 0;
      rowIdx += 1;
    }
    if (rowIdx === N) {
      maxSum = Math.max(maxSum, sum);
      return;
    }

    if (!visited[rowIdx][colIdx]) {
      visited[rowIdx][colIdx] = true;
      sum += strengthList[rowIdx][colIdx] * 2;

      for (const [[rowIdx1, colIdx1], [rowIdx2, colIdx2]] of getShapesIndexList(
        rowIdx,
        colIdx
      )) {
        // console.log([rowIdx1, colIdx1], [rowIdx2, colIdx2]);
        if (
          rowIdx1 < N &&
          rowIdx1 >= 0 &&
          rowIdx2 < N &&
          rowIdx2 >= 0 &&
          colIdx1 < M &&
          colIdx1 >= 0 &&
          colIdx2 < M &&
          colIdx2 >= 0 &&
          !visited[rowIdx1][colIdx1] &&
          !visited[rowIdx2][colIdx2]
        ) {
          visited[rowIdx1][colIdx1] = true;
          visited[rowIdx2][colIdx2] = true;
          sum +=
            strengthList[rowIdx1][colIdx1] + strengthList[rowIdx2][colIdx2];

          backtracking(rowIdx, colIdx + 1);

          sum -=
            strengthList[rowIdx1][colIdx1] + strengthList[rowIdx2][colIdx2];
          visited[rowIdx1][colIdx1] = false;
          visited[rowIdx2][colIdx2] = false;
        }
      }

      sum -= strengthList[rowIdx][colIdx] * 2;
      visited[rowIdx][colIdx] = false;
    }

    backtracking(rowIdx, colIdx + 1, sum);
  };

  backtracking(0, 0);
  return maxSum;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 632
      // "./input2.txt", // 0
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...input] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);

  console.log(
    findMaxBoomerang(
      N,
      M,
      input.map((v) => v.split(" ").map(Number))
    )
  );
}
