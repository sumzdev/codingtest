// https://www.acmicpc.net/problem/15486
// 퇴사 2
// 골드 5
// DP
// 231113

// ---------------------------------------
function findMaxPrice(table) {
  // console.log(table);
  const maxTable = Array(table.length + 1).fill(0);
  let max = 0;

  for (let i = 0; i < table.length; i += 1) {
    const endTime = table[i][0] + i;
    maxTable[i] = Math.max(max, maxTable[i]);
    max = maxTable[i];

    if (endTime <= table.length) {
      maxTable[i] += table[i][1];
      maxTable[endTime] = Math.max(maxTable[endTime], maxTable[i]);
    }

    // console.log(i, maxTable.join(" "), max);
  }

  return Math.max(maxTable[table.length], maxTable[table.length - 1]);
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
  const inputString = fs.readFileSync(filePath).toString();
  const [dDay, ...input] = inputString.trim().split("\n");

  console.log(findMaxPrice(input.map((v) => v.split(" ").map(Number))));
}
