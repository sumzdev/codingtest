// https://www.acmicpc.net/problem/1806
// 부분합
// 골드 4
// 투 포인터
// 231031
// ---------------------------------------
// 수열 길이 : 10 ≤ N < 100,000
// 합 기준 : 0 < S ≤ 100,000,000
// 연속 부분합 중이 S 이상이 되는 것 중 가장 짧은 것 길이 구하기
// 합 S 만드는 것 불가능한 경우 0 출력
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function findMaxSushiType(targetSum, list) {
  // console.log(targetSum, list);

  let minLen = list.length + 1;
  let left = 0;
  let right = 0;
  let sum = 0;
  while (right < list.length) {
    sum += list[right];
    // console.log("sum", sum, `[${left},${right}]`);

    while (sum >= targetSum) {
      minLen = Math.min(minLen, right - left + 1);
      // console.log("left 당기기", left, sum);
      sum -= list[left++];
    }

    right += 1;
  }
  return minLen === list.length + 1 ? 0 : minLen;
}
// ---------------------------------------
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
  const [info, list] = inputString.trim().split("\n");
  const [listLen, targetSum] = info.split(" ").map(Number);

  console.log(findMaxSushiType(targetSum, list.split(" ").map(Number)));
}
