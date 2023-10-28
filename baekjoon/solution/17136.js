// https://www.acmicpc.net/problem/17136
// 색종이 붙이기
// 골드 2
// 완전 탐색, 백트레킹
// 231028
// ---------------------------------------
// 1x1, ... 5x5 - 각 5개
// board는 10x10 - 각 0 또는 1
// board의 1을 색종이 붙여서 채우기
// 필요한 색종이 개수 or 불가능하면 -1 리턴
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function attachPaper(board) {
  // console.log(board.map((v) => v.join(" ")).join("\n"));

  let minCntPaper = 26;
  const cntSizePaper = { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 };
  const visited = Array.from({ length: 10 }, () => Array(10).fill(false));

  const checkCanAttachPaper = (startI, startJ, size) => {
    if (startI + size > 10 || startJ + size > 10) return false;

    for (let i = startI; i < startI + size; i += 1) {
      for (let j = startJ; j < startJ + size; j += 1) {
        if (!board[i][j] || visited[i][j]) return false;
      }
    }
    return true;
  };

  const markVisited = (startI, startJ, size, visitedFlag) => {
    for (let i = startI; i < startI + size; i += 1) {
      for (let j = startJ; j < startJ + size; j += 1) {
        visited[i][j] = visitedFlag;
      }
    }
  };

  const backtracking = (i, j, cntPaper) => {
    let [curI, curJ] = [i, j + 1];
    if (curJ >= 10) {
      curI += 1;
      curJ = 0;
    }
    if (curI === 10) {
      // console.log(">>", cntPaper, cntSizePaper);
      minCntPaper = Math.min(minCntPaper, cntPaper);
      return;
    }

    if (board[curI][curJ] === 0 || visited[curI][curJ]) {
      backtracking(curI, curJ, cntPaper);
      return;
    }

    for (let size = 5; size >= 1; size -= 1) {
      // console.log(curI, curJ, size, cntSizePaper);

      if (cntSizePaper[size] > 0 && checkCanAttachPaper(curI, curJ, size)) {
        cntSizePaper[size] -= 1;
        markVisited(curI, curJ, size, true);

        // console.log(curI, curJ, size, cntSizePaper);
        backtracking(curI, curJ, cntPaper + 1);

        markVisited(curI, curJ, size, false);
        cntSizePaper[size] += 1;
      }
    }
  };

  backtracking(0, -1, 0);

  return minCntPaper === 26 ? -1 : minCntPaper;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 8
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");

  console.log(attachPaper(input.map((v) => v.split(" ").map(Number))));
}
