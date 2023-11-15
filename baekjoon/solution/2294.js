// https://www.acmicpc.net/problem/2294
// 동전 2
// 골드 5
// DP
// 231115
// ---------------------------------------
// targetSum = 15
// coinList = [3, 5, 6]
// 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 (인덱스)
// 0  X  X  1  X  X  2  X  X  3  X  X  4  X  X  5 (coin 3)
// 0  X  X  1  X  1  2  X  2  3  2  3  4  3  4 [3] (coin 5)
// ex) list[15] = max( list[15](=5), list[15 - 5]+1(=3) ) = 3
// 0  X  X  1  X  1  1  X  2  2  2  2  2  3  3  3 (coin 6)

// ---------------------------------------
function findSumMinCoin(targetSum, coinList) {
  // coinList = coinList.sort((a, b) => a - b);
  const IMPOSSIBLE = 10001;

  const dp = Array(targetSum + 1).fill(IMPOSSIBLE);
  dp[0] = 0;
  // console.log(dp.map((_, i) => `${i}`.padStart(2, " ")).join(" "));

  const [coin] = coinList.splice(0, 1);
  for (let idx = 1; idx * coin <= targetSum; idx += 1) {
    dp[idx * coin] = idx;
  }
  // console.log(
  //   dp.map((v) => `${v === IMPOSSIBLE ? "X" : v}`.padStart(2, " ")).join(" ")
  // );

  for (const coin of coinList) {
    dp[coin] = 1;
    for (let idx = coin + 1; idx < dp.length; idx += 1) {
      dp[idx] = Math.min(dp[idx - coin] + 1, dp[idx]);
    }
    // console.log(
    //   dp.map((v) => `${v === IMPOSSIBLE ? "X" : v}`.padStart(2, " ")).join(" ")
    // );
  }
  return dp[targetSum] === IMPOSSIBLE ? -1 : dp[targetSum];
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
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...input] = inputString.trim().split("\n");
  const [lengthOfList, targetNum] = info.split(" ").map(Number);

  console.log(findSumMinCoin(targetNum, input.map(Number)));
}
