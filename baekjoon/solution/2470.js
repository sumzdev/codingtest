// https://www.acmicpc.net/problem/2470
// 두 용액
// 골드 5
// 투 포인터, 이분 탐색
// 231011

// ---------------------------------------
// 추가 테스트 - https://www.acmicpc.net/board/view/105364
// -99 -98 1 0 96
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function findSumZero(array) {
  // console.log(array);
  let leftIdx = 0;
  let rightIdx = array.length - 1;

  let min = Math.abs(array[leftIdx] + array[rightIdx]);
  let minPair = [array[leftIdx], array[rightIdx]];

  while (leftIdx < rightIdx) {
    const sum = array[leftIdx] + array[rightIdx];
    // console.log(leftIdx, rightIdx, array[leftIdx], array[rightIdx], min, sum);

    if (Math.abs(sum) < min) {
      min = Math.abs(sum);
      minPair = [array[leftIdx], array[rightIdx]];
    }
    if (sum === 0) {
      return `${array[leftIdx]} ${array[rightIdx]}`;
    }

    if (sum < 0) {
      leftIdx += 1;
    } else {
      rightIdx -= 1;
    }
  }
  return `${minPair[0]} ${minPair[1]}`;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, array] = inputString.trim().split("\n");

  console.log(
    findSumZero(
      array
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    )
  );
}
