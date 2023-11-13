// https://www.acmicpc.net/problem/11660
// 구간 합 구하기 5
// 실버 1
// DP
// 231113

// ---------------------------------------
function makeSumTable(table) {
  const sumTable = table.map((v) => [...v]);

  sumTable[0][0] = table[0][0];
  for (let j = 1; j < table.length; j += 1) {
    sumTable[0][j] = sumTable[0][j - 1] + table[0][j];
  }
  for (let i = 1; i < table.length; i += 1) {
    sumTable[i][0] = sumTable[i - 1][0] + table[i][0];
    for (let j = 1; j < table.length; j += 1) {
      sumTable[i][j] =
        sumTable[i - 1][j] +
        sumTable[i][j - 1] -
        sumTable[i - 1][j - 1] +
        table[i][j];
    }
  }

  return sumTable;
}

function getIntervalSum(sumTable, intervalList) {
  // console.log(sumTable);
  // console.log(intervalList);
  let result = "";

  for (const [y1, x1, y2, x2] of intervalList) {
    result += `${
      sumTable[y2 - 1][x2 - 1] -
      (x1 - 2 >= 0 ? sumTable[y2 - 1][x1 - 2] : 0) -
      (y1 - 2 >= 0 ? sumTable[y1 - 2][x2 - 1] : 0) +
      (y1 - 2 >= 0 && x1 - 2 >= 0 ? sumTable[y1 - 2][x1 - 2] : 0)
    }\n`;
  }
  return result.trim();
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
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...input] = inputString.trim().split("\n");
  const [tableSize, numOfInterval] = info.split(" ").map(Number);

  const sumTable = makeSumTable(
    input.splice(0, tableSize).map((v) => v.split(" ").map(Number))
  );
  const intervalList = input.map((v) => v.split(" ").map(Number));

  console.log(getIntervalSum(sumTable, intervalList));
}
