// https://www.acmicpc.net/problem/1074
// Z
// 실버 1
// 분할 정복
// 231006

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

// size = 8 (2^3)
// addNum = (2^2)*(2^2) = 16

function getDividedIndex(startI, startJ, size) {
  const dividedSize = size >> 1;
  return [
    [startI + dividedSize, startJ + dividedSize],
    [startI + dividedSize, startJ + size],
    [startI + size, startJ + dividedSize],
    [startI + size, startJ + size],
  ];
}

function getZNum(N, row, col) {
  // console.log(N, row, col);
  let [startRowIndex, startColIndex] = [0, 0];
  let num = 0;

  for (let n = N; n >= 0; n -= 1) {
    if (startRowIndex === row && startColIndex === col) return num;

    // console.log("==========", n, 2 ** n);
    const size = 2 ** n;
    const indexList = getDividedIndex(startRowIndex, startColIndex, size);

    for (let [endRowIdx, endColIdx] of indexList) {
      // console.log("-", endRowIdx, endColIdx, num);
      if (row < endRowIdx && col < endColIdx) {
        startRowIndex = endRowIdx - (size >> 1);
        startColIndex = endColIdx - (size >> 1);
        break;
      }
      num += 2 ** (n - 1) * 2 ** (n - 1);
    }
  }
}

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 11
      "./input2.txt", // 63
      "./input3.txt", // 0
      "./input4.txt", // 63
      "./input5.txt", // 262143
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, row, col] = inputString.trim().split(" ").map(Number);
  console.log(getZNum(N, row, col));
}
