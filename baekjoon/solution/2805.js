// https://www.acmicpc.net/problem/2805
// 나무 자르기
// 실버 2
// 이분 탐색
// 231102
// ---------------------------------------
// 1 ≤ 수열 길이 ≤ 1,000,000
// 1 ≤ 필요한 나무길이 ≤ 2,000,000,000
// 0 ≤ 나무 높이 ≤ 1,000,000,000
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function findMaxHeight(targetHeight, list) {
  let max = Math.max(...list);
  let min = 0;

  let maxHeight = 0;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    // console.log(">", min, max, mid);

    const gainHeight = list.reduce((sum, v) => {
      const gain = v - mid;
      if (gain < 0) return sum;
      return sum + gain;
    }, 0);

    if (gainHeight < targetHeight) {
      max = mid - 1;
    } else {
      // console.log(">>>", mid, gainHeight);
      // if (gainHeight === targetHeight) return mid;
      if (mid > maxHeight) maxHeight = mid;
      min = mid + 1;
    }
  }
  return maxHeight;
}

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
      "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, list] = inputString.trim().split("\n");
  const [N, M] = info.split(" ").map(Number);

  console.log(findMaxHeight(M, list.split(" ").map(Number)));
}
