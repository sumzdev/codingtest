// https://www.acmicpc.net/problem/2293
// 동전 1
// 골드 5
// DP
// 231115
// ---------------------------------------
// node.js로 통과 못하는 문제 -- https://www.acmicpc.net/board/view/109917
// ---------------------------------------
// targetSum = 18
// coinList = [3, 5, 6]
//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 (인덱스)
//  1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 (초기화)
//  1  0  0  1  0  0  1  0  0  1  0  0  1  0  0  1  0  0  1 (3)
//  1  0  0  1  0  1  1  0  1  1  1  1  1  1  1 [2] 1  1  2 (5)
// ex) list[15] = prev_list[15](=1) + list[15 - 5](=1) = 2
//  1  0  0  1  0  1  2  0  1  2  1  2  3  1  2 [4] 2  3  5 (6)
// ex) list[15] = prev_list[15](=2) + list[15-6](=2) = 4
// ---------------------------------------
function findSumComb(targetSum, coinList) {
  const dp = Array(targetSum + 1).fill(0);
  dp[0] = 1;
  // console.log(dp.map((v, i) => `${i}`.padStart(2, " ")).join(" "));
  // console.log(dp.map((v) => `${v}`.padStart(2, " ")).join(" "));

  for (const coin of coinList) {
    for (let idx = coin; idx < dp.length; idx += 1) {
      dp[idx] += dp[idx - coin];
    }
    // console.log(dp.map((v) => `${v}`.padStart(2, " ")).join(" "));
  }
  return dp[targetSum];
}
// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...input] = inputString.trim().split("\n");
  const [lengthOfList, targetNum] = info.split(" ").map(Number);

  console.log(findSumComb(targetNum, input.map(Number)));
}
