// https://www.acmicpc.net/problem/1548
// 부분 삼각 수열
// 골드 5
// 완전 탐색, 그리디, 정렬
// 231018

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 0 1 2 3 4 5 6 - index
// 1 2 3 3 4 4 5 - 수열
// 0 3 5 5 5 5 6 - 수열 가장 작은 합 - minSumList
// 0 0 1 1 1 1 2 - 수열 가장 작은 합의 시작 인덱스 - minSumStartIdxList
// 1 2 2 3 4 5 5 - 수열 길이
// ---------------------------------------
/**
 *
 * @param {number} N : N <= 50
 * @param {number[]} numberList : 1 <= num <= 10^9
 * @returns 가장 긴 부분 삼각 수열의 길이
 */
function getMaxTrigonometricSequence(N, numberList) {
  // console.log(N, numberList);
  if (N === 1) return 1;

  const minSumList = new Array(N).fill(0);
  const minSumStartIdxList = new Array(N).fill(0);
  let maxLength = 0;

  for (let i = 1; i < N; i += 1) {
    for (
      let startIdx = minSumStartIdxList[i - 1];
      startIdx < i;
      startIdx += 1
    ) {
      const sum = numberList[startIdx] + numberList[startIdx + 1];
      if (sum > numberList[i]) {
        minSumList[i] = sum;
        minSumStartIdxList[i] = startIdx;
        maxLength = Math.max(maxLength, i - startIdx + 1);
        break;
      }
    }
  }

  return maxLength;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", // 2
      // "./input2.txt", // 5
      // "./input3.txt", // 8
      // "./input4.txt", // 4
      "./input5.txt", // 1
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, numberList] = inputString.trim().split("\n");
  console.log(
    getMaxTrigonometricSequence(
      +N,
      numberList
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    )
  );
}
