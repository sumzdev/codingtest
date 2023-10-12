// https://www.acmicpc.net/problem/9663
// N-Queen
// 골드 4
// 백트래킹
// 231012

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function findNQueen(N) {
  const board = Array.from({ length: N }).map((_) =>
    Array.from({ length: N }).map((_) => false)
  );
  const visitedRow = Array.from({ length: N }).fill(false);
  const visitedCol = Array.from({ length: N }).fill(false);

  let count = 0;

  const checkHorizontalAndVertical = (curRowIdx, curColIdx) => {
    return !visitedRow[curRowIdx] && !visitedCol[curColIdx];
  };

  const checkDiagonal = (curRowIdx, curColIdx) => {
    // 왼쪽 위 대각선 방향 확인
    let [rowIdx, colIdx] = [curRowIdx, curColIdx];
    while (rowIdx >= 0 && colIdx >= 0) {
      if (board[rowIdx][colIdx]) return false;
      rowIdx -= 1;
      colIdx -= 1;
    }

    // 오른쪽 위 대각선 방향 확인
    [rowIdx, colIdx] = [curRowIdx, curColIdx];
    while (rowIdx >= 0 && colIdx < N) {
      if (board[rowIdx][colIdx]) return false;
      rowIdx -= 1;
      colIdx += 1;
    }
    return true;
  };

  const backtracking = (rowIdx) => {
    if (rowIdx === N) {
      // console.log(board.map((r) => r.map((v) => (v ? "O" : "-")).join("")));
      count += 1;
      return;
    }

    for (let colIdx = 0; colIdx < N; colIdx += 1) {
      if (
        checkHorizontalAndVertical(rowIdx, colIdx) &&
        checkDiagonal(rowIdx, colIdx)
      ) {
        visitedCol[colIdx] = true;
        visitedRow[rowIdx] = true;
        board[rowIdx][colIdx] = true;

        backtracking(rowIdx + 1);

        visitedCol[colIdx] = false;
        visitedRow[rowIdx] = false;
        board[rowIdx][colIdx] = false;
      }
    }
  };
  backtracking(0, 0);
  return count;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", // 0
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const N = +inputString.trim();
  console.log(findNQueen(+N));

  // test
  // for (let n = 1; n < 15; n += 1) {
  //   console.log(n, findNQueen(n));
  // }

  // 1 1
  // 2 0
  // 3 0
  // 4 2
  // 5 10
  // 6 4
  // 7 40
  // 8 92
  // 9 352
  // 10 724
  // 11 2680
  // 12 14200
  // 13 73712
  // 14 365596
}
