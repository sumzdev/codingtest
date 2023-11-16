// https://www.acmicpc.net/problem/15724
// 주지수
// 실버 1
// DP
// 231116
// ---------------------------------------
// 11660 구간합 구하기와 유사
// ---------------------------------------
const intervalSum = {
  makeSumTable(table) {
    const sumTable = table.map((v) => [...v]);

    sumTable[0][0] = table[0][0];
    for (let j = 1; j < table[0].length; j += 1) {
      sumTable[0][j] = sumTable[0][j - 1] + table[0][j];
    }
    for (let i = 1; i < table.length; i += 1) {
      sumTable[i][0] = sumTable[i - 1][0] + table[i][0];
      for (let j = 1; j < table[0].length; j += 1) {
        sumTable[i][j] =
          sumTable[i - 1][j] +
          sumTable[i][j - 1] -
          sumTable[i - 1][j - 1] +
          table[i][j];
      }
    }

    this.sumTable = sumTable;
    // return sumTable;
  },
  getIntervalSum([x1, y1, x2, y2]) {
    return (
      this.sumTable[x2 - 1][y2 - 1] -
      (y1 - 2 >= 0 ? this.sumTable[x2 - 1][y1 - 2] : 0) -
      (x1 - 2 >= 0 ? this.sumTable[x1 - 2][y2 - 1] : 0) +
      (x1 - 2 >= 0 && y1 - 2 >= 0 ? this.sumTable[x1 - 2][y1 - 2] : 0)
    );
  },
};

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
  const inputString = fs.readFileSync(filePath).toString();
  const [tableSize, ...input] = inputString.trim().split("\n");
  const [tableHeight, tableWidth] = tableSize.split(" ").map(Number);

  intervalSum.makeSumTable(
    input.splice(0, tableHeight).map((v) => v.split(" ").map(Number))
  );
  const testCnt = +input.splice(0, 1);
  const intervalList = input.map((v) => v.split(" ").map(Number));
  let result = "";
  for (const intervalPoints of intervalList) {
    result += `${intervalSum.getIntervalSum(intervalPoints)}\n`;
  }

  console.log(result.trim());
}
