// https://www.acmicpc.net/problem/9084
// 동전
// 골드 5
// DP - 동전 - 경우의수
// 231116
// ---------------------------------------
function findSumComb(targetSum, coinList) {
  const dp = Array(targetSum + 1).fill(0);
  dp[0] = 1;

  for (const coin of coinList) {
    for (let idx = coin; idx < dp.length; idx += 1) {
      dp[idx] += dp[idx - coin];
    }
  }
  return dp[targetSum];
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
  const input = fs.readFileSync(filePath);
  const inputLine = input.toString().trim().split("\n");

  let result = "";

  let idx = 0;
  let testCase = +inputLine[idx++];
  while (testCase--) {
    const numOfCoin = +inputLine[idx++];
    const coinList = inputLine[idx++].split(" ").map(Number);
    const targetSum = +inputLine[idx++];
    result += findSumComb(targetSum, coinList) + "\n";
  }

  console.log(result.trim());
}
